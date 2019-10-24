import { GraphQLClient, ClientContext, useMutation } from 'graphql-hooks';
import React, { useEffect } from 'react';
import delay from 'delay';
import './App.css';
import Question from './Question.js';

import { Container, Col, Row } from 'react-bootstrap';

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
  return <Question
    qid={data.createQuestion.qid}
    pics={data.createQuestion.pics}
    choices={data.createQuestion.choices}
    onAnswer={async() => {
      await delay(1000); // move to the next question after a wait
      createQuestion({variables: { taxonId: 47347 }});
    }}
  />;
}

function App() {
  return (
    <ClientContext.Provider value={client}>
      <div class="root">

      <div class="panel">
        <div class="clue">
          <div class="clue-text">
            <img class="clue-img" src="https://static.inaturalist.org/photos/54847498/medium.jpeg?1571902439"/>
          </div>
        </div>
        <Container style={{"width": "400px"}}>
          <Row>
            <Col><div class="choice">Golden</div></Col>
            <Col><div class="choice">Golden Chanelld flsakjadf l;daskj f;alsk</div></Col>
          </Row>
          <Row>
            <Col><div class="choice">Golden Chanterell</div></Col>
            <Col><div class="choice">Golden Chanterelfdsfasfd</div></Col>
          </Row>
        </Container>
      </div>
      </div>
    </ClientContext.Provider>
  );
}

export default App;
