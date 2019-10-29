import React, { useEffect } from 'react';
import { GraphQLClient, ClientContext, useMutation } from 'graphql-hooks';
import _ from 'lodash';
import delay from 'delay';

import Question from './Question.js';
import './App.css';

const client = new GraphQLClient({
  url: 'http://localhost:4000/graphql'
})

const CREATE_QUESTION = `
  mutation($taxonId: ID!) {
    createQuestion(taxonId: $taxonId) {
      qid
      pics
      choices {
        taxonId
        name
        commonName
      }
    }
  }
`;

function Quiz() {
  const [createQuestion, { loading, error, data}] = useMutation(CREATE_QUESTION);
  useEffect(() => createQuestion({variables: { taxonId: 47347 }}), []);
  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened: ' + JSON.stringify(error, undefined, 2);
  if (!data) return 'Initial load...';

  return (
    <Question
      qid={data.createQuestion.qid}
      pics={data.createQuestion.pics}
      choices={_.shuffle(data.createQuestion.choices)}
      onAnswer={async() => {
        await delay(1000); // move to the next question after a wait
        createQuestion({variables: { taxonId: 47347 }});
      }}
    />
  );
}

function App() {
  return (
    <ClientContext.Provider value={client}>
      <Quiz />
    </ClientContext.Provider>
  );
}

export default App;
