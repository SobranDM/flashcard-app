import React, { useState} from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap';

// Component imports
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Decks from "./Decks";

function Layout() {
  const [trail, setTrail] = useState([]);

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home decks setTrail={setTrail} />
          </Route>
          <Route path="/decks">
            <Decks trail={trail} setTrail={setTrail} />
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