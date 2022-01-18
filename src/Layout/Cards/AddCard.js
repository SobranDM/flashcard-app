import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, createCard } from "../../utils/api";

const AddCard = ({ setTrail }) => {
  const { deckId } = useParams();
  const [formData, setFormData] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState({});
  const [ cardsAdded, setCardsAdded ] = useState(0);
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setTrail([
        { name: response.name, link: `/decks/${deckId}` },
        { name: "Add Card" },
      ]);
    }
    loadDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  function handleSubmit(event, button) {
    event.preventDefault();
    createCard(deckId, formData);
    setFormData({ front: "", back: "" });
    if (button === "done") {
      history.push(`/decks/${deckId}`);
    }
    setCardsAdded(cardsAdded + 1);
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
      <h3>{deck.name}: Add Card</h3>
      <form>
        <div className="form-group d-flex flex-column">
          <label htmlFor="front">Front:</label>
          <textarea
            id="front"
            name="front"
            onChange={handleChange}
            value={formData.front}
            placeholder="Front side of card"
          />
        </div>
        <div className="form-group d-flex flex-column">
          <label htmlFor="back">Back:</label>
          <textarea
            id="back"
            name="back"
            onChange={handleChange}
            value={formData.back}
            placeholder="Back side of card"
          />
        </div>
        <button type="button" className="btn btn-secondary mr-2" name="done" onClick={(event) => handleSubmit(event, "done")}>
          Done
        </button>
        <button type="button" className="btn btn-primary" name="save" onClick={(event) => handleSubmit(event, "save")}>
          Save
        </button>
        <UserFeedback />
      </form>
    </div>
  );
};

export default AddCard;
