import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createDeck } from "../../utils/api/index";
import Breadcrumb from "../Breadcrumb";

const CreateDeck = () => {
  // Controlled form data and history setup
  const [formData, setFormData] = useState({ name: "", description: "" })
  const history = useHistory();

  // Update form data in useState
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  // Create deck on submission and navigate to new deck view
  function handleSubmit(event) {
    event.preventDefault();
    createDeck({name: formData.name, description: formData.description })
      .then((deck) => history.push(`/decks/${deck.id}`));
  }

  // Navigate to home on cancel
  function handleCancel() {
    history.push("/decks")
  }

  return (
    <div>
      <Breadcrumb trail={[{name: "Create Deck"}]} />
      <h3>Create Deck</h3>
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
};

export default CreateDeck;
