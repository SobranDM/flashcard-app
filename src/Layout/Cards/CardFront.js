import React from 'react';

const CardFront = ({ card, toggleFront, cardNumbers }) => {
  // Click handler for Filp Button
  function handleFlip() {
    toggleFront(false);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Card {cardNumbers[0]} of {cardNumbers[1]}</h5>
        <p className="card-text">{card.front}</p>
        <div>
          <button className="btn btn-secondary" type="button" name="flip" onClick={handleFlip}>Flip</button>
        </div>
      </div>
    </div>
  )
}

export default CardFront;
