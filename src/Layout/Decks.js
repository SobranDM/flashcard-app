import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Import components
import Study from "./Study";
import CreateDeck from "./Deck/CreateDeck";
import ViewDeck from "./Deck/ViewDeck";
import EditDeck from "./Deck/EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";

const Decks = ({ trail, setTrail }) => {

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" link="/"><a href="/">Home</a></li>
          {trail.map((item, index) => {
            if (index + 1 === trail.length) {
              return <li className="breadcrumb-item active" aria-current="page" key={index}>{item.name}</li>
            } else {
              return <li className="breadcrumb-item" key={index}><a href={item.link}>{item.name}</a></li>
            }
          })}
        </ol>
      </nav>
      <Switch>
        <Route exact path="/decks">
          <Redirect to="/" />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study setTrail={setTrail} />
        </Route>
        <Route path="/decks/new">
          <CreateDeck setTrail={setTrail} />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck setTrail={setTrail} />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard setTrail={setTrail} />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard setTrail={setTrail} />
        </Route>
        <Route path="/decks/:deckId">
          <ViewDeck setTrail={setTrail} />
        </Route>
      </Switch>
    </>
  );
};

export default Decks;
