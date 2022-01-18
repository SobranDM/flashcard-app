import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { readDeck, readCard, updateCard } from '../../utils/api';

const EditCard = ({ setTrail }) => {
  const { deckId, cardId } = useParams();
  const [ deck, setDeck ] = useState({});
  const [ card, setCard ] = useState({});
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
      setCard(response);
      setFormData({ front: response.front, back: response.back });
    }
    loadDeck();
    loadCard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);
  
   // Update form data in useState
   function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

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
      <form onSubmit={handleSubmit}>
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
        <button type="button" className="btn btn-secondary mr-2" name="cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" name="save">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditCard
