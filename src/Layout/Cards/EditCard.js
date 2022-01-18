import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { readDeck, readCard, updateCard } from '../../utils/api';
import CardForm from './CardForm';

const EditCard = ({ setTrail }) => {
  const { deckId, cardId } = useParams();
  const [ deck, setDeck ] = useState({});
  const [ formData, setFormData ] = useState({ front: "", back: "" });
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setTrail([ { name: response.name, link: `/decks/${deckId}` }, { name: `Edit Card ${cardId}` }]);
    }

    async function loadCard() {
      const response = await readCard(cardId);
      setFormData({ front: response.front, back: response.back });
    }
    loadDeck();
    loadCard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  // Handle cancel button
  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateCard({
      front: formData.front,
      back: formData.back,
      id: cardId,
      deckId: parseInt(deckId)
    }).then(() => history.push(`/decks/${deckId}`))
  }

  return (
    <div>
      <h3>Edit Card</h3>
      <CardForm formData={formData} setFormData={setFormData} />
      <button type="button" className="btn btn-secondary mr-2" name="cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" name="save" onClick={handleSubmit}>
          Save
        </button>
    </div>
  )
}

export default EditCard
