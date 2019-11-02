import React from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';

import Quiz from './Quiz.js';

import 'typeface-varela-round';
import './App.css';

const client = new GraphQLClient({
  url: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ClientContext.Provider value={client}>
      <div id="app">
        <Quiz />
      </div>
    </ClientContext.Provider>
  );
}

export default App;
