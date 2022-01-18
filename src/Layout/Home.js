import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDeck } from "../utils/api/index";

function Home({ setTrail }) {
  const [decks, setDecks] = useState([]);

  // List decks and set them to state
  useEffect(() => {
    listDecks().then(setDecks);
  }, []);

  // Setup history variable
  const history = useHistory();

  // Click handler for Create Deck button
  function createDeck() {
    setTrail([{ name: "Create Deck" }]);
    history.push("/decks/new");
  }

  // Click handler for Delete Deck button
  function deleteButton(deckId) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      deleteDeck(deckId);
      window.location.reload();
    }
  }

  // Click handler for View Deck button
  function viewDeck(deckId) {
    history.push(`/decks/${deckId}`);
  }

  // Click handler for Study Deck button
  function studyDeck(deckId) {
    history.push(`/decks/${deckId}/study`);
  }

  const deckList = decks.map((deck) => {
    return (
      <div className="card mb-2" key={deck.id}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4 className="card-title">{deck.name}</h4>
            <h6 className="card-subtitle text-muted mt-1 mr-1">
              {deck.cards.length} cards
            </h6>
          </div>
          <p className="card-text">{deck.description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <button
                id="view-deck"
                className="btn btn-secondary mr-2"
                onClick={() => viewDeck(deck.id, deck.name)}>
                <FontAwesomeIcon icon="eye" /> View
              </button>
              <button
                id="study-deck"
                className="btn btn-primary"
                onClick={() => studyDeck(deck.id)}>
                <FontAwesomeIcon icon="book" /> Study
              </button>
            </div>
            <div className="d-flex justify-content-end">
              <button
                id="delete-deck"
                className="btn btn-danger"
                onClick={() => deleteButton(deck.id)}>
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <button
        id="create-deck"
        className="btn btn-secondary mb-2"
        onClick={createDeck}>
        <FontAwesomeIcon icon="plus" /> Create Deck
      </button>
      {deckList}
    </div>
  );
}

export default Home;
