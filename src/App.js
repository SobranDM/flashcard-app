import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout";

// Font Awesome icon imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faBook, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTrashAlt, faBook, faEye);
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
