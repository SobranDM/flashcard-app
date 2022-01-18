import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CardBack = ({ card, toggleFront, currentCard, setCurrentCard, cardNumbers }) => {
  const history = useHistory();

  // Click handler for Next Button
  function handleNext() {
    if (currentCard + 1 >= cardNumbers[1]) {
      if (window.confirm("Do you wish to restart this deck?")) {
        toggleFront(true);
        setCurrentCard(0);
      } else {
        history.push("/")
      }
    } else {
      toggleFront(true);
      setCurrentCard(currentCard + 1);
    }
  }

  function handleFlip() {
    toggleFront(true);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Card {cardNumbers[0]} of {cardNumbers[1]}</h5>
        <p className="card-text">{card.back}</p>
        <div>
          <button className="btn btn-secondary mr-2" type="button" name="flip" onClick={handleFlip}>Flip</button>
          <button className="btn btn-primary" type="button" name="next" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default CardBack;