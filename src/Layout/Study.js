import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { readDeck } from "../utils/api/index";

function Study({setTrail}) {
  const { deckId } = useParams();
  const [ cards, setCards ] = useState([]);
  const [ currentCard, setCurrentCard ] = useState(0);

  useEffect(() => {
    async function loadDeck(){
      const response = await readDeck(deckId);
      const deck = response;
      setTrail( [ { name: deck.name, link: `/decks/${deckId}` }, { name: "Study" } ] );
      setCards(deck.cards);
    }
    loadDeck()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);
  
  

  return (
    <div>
      
    </div>
  )
}

export default Study;