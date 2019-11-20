import React from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';


import Quiz from './Quiz.js';
import TaxonTree from './TaxonTree.js';

import 'typeface-varela-round';
import './App.css';

const client = new GraphQLClient({
  url: process.env.REACT_APP_API_URI
});

export default function App() {
  return (
    <ClientContext.Provider value={client}>
      <div id="app">
        <Router>
          <Switch>
            <Route exact path="/">
              <TaxonTree />
            </Route>
            <Route path="/quiz/:taxonId">
              <Quiz />
            </Route>
          </Switch>
        </Router>
      </div>
    </ClientContext.Provider>
  );
}
