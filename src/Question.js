import React, { useState } from 'react';
import Slider from "react-slick";
import { Card } from 'react-bootstrap';
import { useMutation } from 'graphql-hooks';

import 'bootstrap/dist/css/bootstrap.min.css';

import Choice from './Choice.js';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './question.css';

const MAKE_GUESS = `
  mutation($qid: ID!, $taxonId: ID!) {
    makeGuess(qid: $qid, taxonId: $taxonId)
  }
`;

export default function Question({qid, pics, choices }) {
  const [makeGuess] = useMutation(MAKE_GUESS);
  const [answer, setAnswer] = useState(null);

  async function guessHandler(qid, taxonId) {
    const resp = await makeGuess({ variables: { qid, taxonId }});
    setAnswer(resp.data.makeGuess);
  }

  const images = pics.map( (pic) => <div><img src={pic} alt=""/></div>);
  const buttons = choices.map( (choice) => {
    let mode = 'unselected';
    if (answer && answer === choice.taxonId) {
      mode = 'correct';
    } else if (answer && answer !== choice.taxonId) {
      mode = 'incorrect';
    }
    return (
      <Choice
        mode={mode}
        onClick={() => guessHandler(qid, choice.taxonId)}>
        <div>
          {choice.name + " " + choice.commonName}
        </div>
      </Choice>
    );
  });
  return (
    <Card style={{ width: '50rem', margin: '50px' }}>
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Slider dots>
          {images}
        </Slider>
      </Card.Body>
      <Card.Footer>
        {buttons}
      </Card.Footer>
    </Card>
  );
}