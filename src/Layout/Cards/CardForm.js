import React from 'react';

const CardForm = ({ formData, setFormData }) => {

   // Update form data in useState
   function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  return (
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
      </form>
  )
}

export default CardForm
