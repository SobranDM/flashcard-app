import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { readDeck, deleteCard } from '../../utils/api';
import Breadcrumb from '../Breadcrumb';

const ViewDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response)
      setCards(response.cards);
    }
    loadDeck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId])

  // Click handler for Study Deck button
  function studyDeck() {
    history.push(`/decks/${deckId}/study`);
  }

  // Click handler for Edit Deck button
  function editDeck() {
    history.push(`/decks/${deckId}/edit`);
  }

  // Click handler for Add Card button
  function addCard() {
    history.push(`/decks/${deckId}/cards/new`);
  }

  // Click handler for Edit Card button
  function handleEdit(pushedId) {
    history.push(`/decks/${deckId}/cards/${pushedId}/edit`)
  }

  // Click handler for Delete Card button
  function handleDelete(pushedId) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      deleteCard(pushedId);
    }
  }

  return (
    <div>
      <Breadcrumb trail={[{ name: deck.name }]} />
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <button className='btn btn-secondary mr-2' onClick={editDeck}>Edit</button>
        <button className='btn btn-primary mr-2' onClick={studyDeck}>Study</button>
        <button className='btn btn-primary' onClick={addCard}>Add Cards</button>
      </div>
      <div>
        <h2 className='mt-4'>Cards</h2>
        {cards.map((card, index) => {
          return (
            <div className='card w-90' key={index}>
              <div className='card-body'>
                <div className='row'>
                  <p className='card-text col'>{card.front}</p>
                  <p className='card-text col'>{card.back}</p>
                </div>
                <div className='d-flex justify-content-end mt-4'>
                  <button className='btn btn-secondary mr-2' onClick={() => handleEdit(card.id)}>Edit</button>
                  <button className='btn btn-danger' onClick={() => handleDelete(card.id)}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ViewDeck;
