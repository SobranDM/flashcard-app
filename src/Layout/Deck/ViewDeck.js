import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { readDeck } from '../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ViewDeck = ({ setTrail }) => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response)
      setTrail([{ name: response.name }])
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

  return (
    <div>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <button className='btn btn-secondary mr-2' onClick={editDeck}><FontAwesomeIcon icon="pencil-alt" /> Edit</button>
        <button className='btn btn-primary mr-2' onClick={studyDeck}><FontAwesomeIcon icon="book" /> Study</button>
        <button className='btn btn-primary' onClick={addCard}><FontAwesomeIcon icon="plus" /> Add Cards</button>
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
                  <button className='btn btn-secondary mr-2'><FontAwesomeIcon icon="pencil-alt" /> Edit</button>
                  <button className='btn btn-danger'><FontAwesomeIcon icon="trash-alt" /></button>
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
