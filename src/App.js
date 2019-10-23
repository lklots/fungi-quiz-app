import { GraphQLClient, ClientContext, useQuery, useMutation } from 'graphql-hooks';
import React from 'react';
import './App.css';
import Question from './Question.js';

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

const MAKE_GUESS = `
  mutation($qid: ID!, $taxonId: ID!) {
    makeGuess(qid: $qid, taxonId: $taxonId)
  }
`;

function Quiz() {
  const { loading, error, data } = useQuery(CREATE_QUESTION, {
    variables: {
      taxonId: 47347,
    }
  });
  const [makeGuess] = useMutation(MAKE_GUESS);
  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened: ' + JSON.stringify(error, undefined, 2);

  return <Question
    qid={data.createQuestion.qid}
    pics={data.createQuestion.pics}
    choices={data.createQuestion.choices}
    onGuess={(qid, taxonId) => makeGuess({ variables: { qid, taxonId, } }).then(x => console.log(x))}
  />;
}

function App() {
  return (
    <ClientContext.Provider value={client}>
      <div>
        <Quiz />
      </div>
    </ClientContext.Provider>
  );
}

export default App;
