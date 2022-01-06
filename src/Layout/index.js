import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../home/Home";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/">
            <Home />
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
