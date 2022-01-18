import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { readDeck } from '../../utils/api';
import { updateDeck } from '../../utils/api';

const EditDeck = ({ setTrail }) => {
  const { deckId } = useParams();
  const [ deck, setDeck ] = useState({});
  const [formData, setFormData] = useState({ name: "", description: "" });
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response)
      setFormData({ name: response.name, description: response.description });
      setTrail([ { name: response.name, link: `/decks/${deckId}` }, { name: "Edit Deck" }])
    }
    loadDeck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  // Update form data in useState
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  // Submit API call to update deck on submit
  function handleSubmit(event) {
    event.preventDefault();
    updateDeck({ name: formData.name, description: formData.description, id: deck.id })
      .then(() => history.push(`/decks/${deckId}`));
  }

  // Navigate to View Deck on cancel
  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <h3>Edit Deck</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group d-flex flex-column">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Deck Name" />
        </div>
        <div className="form-group d-flex flex-column">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" onChange={handleChange} value={formData.description} placeholder="Brief description of the deck" />
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default EditDeck
