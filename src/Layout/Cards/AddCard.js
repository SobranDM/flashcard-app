import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";
import Breadcrumb from "../Breadcrumb";

const AddCard = () => {
  const { deckId } = useParams();
  const [formData, setFormData] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState({});
  const [ cardsAdded, setCardsAdded ] = useState(0);
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  function handleSubmit(button) {
    if (button === "done") {
      createCard(deckId, formData).then(history.push(`/decks/${deckId}`));
    } else {
      createCard(deckId, formData);
      setFormData({ front: "", back: "" });
      setCardsAdded(cardsAdded + 1);
    }
  }

  function UserFeedback() {
    if (cardsAdded === 0) {
      return null;
    } else if (cardsAdded === 1) {
    return <p className="text-success mt-2">Card added!</p>
    } else {
      return <p className="text-success mt-2">Card added! (x{cardsAdded})</p>
    }
  }

  return (
    <div>
      <Breadcrumb trail={[{ name: deck.name, link: `/decks/${deckId}` }, { name: "Add Card" }]} />
      <h3>{deck.name}: Add Card</h3>
      <CardForm formData={formData} setFormData={setFormData} />
      <button type="button" className="btn btn-secondary mr-2" name="done" onClick={(event) => handleSubmit("done")}>
          Done
        </button>
        <button type="button" className="btn btn-primary" name="save" onClick={(event) => handleSubmit("save")}>
          Save
        </button>
      <UserFeedback />
    </div>
  );
};

export default AddCard;
