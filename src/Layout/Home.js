import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import { deleteDeck } from "../utils/api/index";

function Home() {
  const [decks, setDecks] = useState([]);

  // List decks and set them to state
  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    loadDecks();
  }, []);

  // Setup history variable
  const history = useHistory();

  // Click handler for Create Deck button
  function createDeck() {
    history.push("/decks/new");
  }

  // Click handler for Delete Deck button
  function deleteButton(deckId) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      deleteDeck(deckId);
      history.push("/");
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

  return (
    <div>
      <button
        id="create-deck"
        className="btn btn-secondary mb-2"
        onClick={createDeck}>
        Create Deck
      </button>
      {decks.map((deck, index) => {
        return (
          <div className="card mb-2" key={index}>
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
                    onClick={() =>
                      viewDeck(deck.id, deck.name)
                    }>
                    View
                  </button>
                  <button
                    id="study-deck"
                    className="btn btn-primary"
                    onClick={() => studyDeck(deck.id)}>
                    Study
                  </button>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    id="delete-deck"
                    className="btn btn-danger"
                    onClick={() => deleteButton(deck.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Home;
