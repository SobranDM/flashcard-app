import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { readDeck } from "../utils/api/index";

import NotEnoughCards from "./Cards/NotEnoughCards";
import CardBack from "./Cards/CardBack";
import CardFront from "./Cards/CardFront";
import Breadcrumb from './Breadcrumb';

function Study() {
  const { deckId } = useParams();
  const [ deck, setDeck ] = useState({});
  const [ cards, setCards ] = useState([]);
  const [ currentCard, setCurrentCard ] = useState(0);
  const [ showFront, toggleFront ] = useState(true);

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setCards(response.cards);
    }
    loadDeck()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  function CardDisplay() {
    if (cards.length < 3) {
      return <NotEnoughCards cardLength={cards.length} />
    } else if (showFront) {
      return <CardFront card={cards[currentCard]} toggleFront={toggleFront} cardNumbers={[currentCard + 1, cards.length]} />
    } else {
      return <CardBack card={cards[currentCard]} toggleFront={toggleFront} currentCard={currentCard} setCurrentCard={setCurrentCard} cardNumbers={[currentCard + 1, cards.length]} />
    }
  }

  return (
    <div>
      <h3>Study: {deck.name}</h3>
      <Breadcrumb trail={[ { name: deck.name, link: `/decks/${deckId}` }, { name: "Study" } ]} />
      <CardDisplay />
    </div>
  )
}

export default Study;