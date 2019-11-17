import React from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';

import Quiz from './Quiz.js';
import TaxonTree from './TaxonTree.js';

import 'typeface-varela-round';
import './App.css';

const client = new GraphQLClient({
  url: 'http://localhost:4000/graphql'
})

export default function App() {
  return (
    <ClientContext.Provider value={client}>
      <div id="app">
        <TaxonTree onSelected={() => {}} />
      </div>
    </ClientContext.Provider>
  );
}
