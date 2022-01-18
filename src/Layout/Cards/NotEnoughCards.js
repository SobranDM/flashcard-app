import React from 'react';

const NotEnoughCards = ({ cardLength }) => {
  return (
    <div>
      <h4>Not enough cards.</h4>
      <p>You need at least 3 cards to study. There are {cardLength} cards in this deck.</p>
    </div>
  )
}

export default NotEnoughCards;