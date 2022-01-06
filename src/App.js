import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <Router>
      <div className="app-routes">
        <Switch>
          <Route path="/">
            <Layout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
