import React from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap';

// Component imports
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Decks from "./Decks";

function Layout() {

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home decks />
          </Route>
          <Route path="/decks">
            <Decks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;