import React from 'react';
import Slider from "react-slick";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Choice from './Choice.js';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './question.css';

export default function Question({qid, pics, choices, onGuess }) {
  const images = pics.map( (pic) => <div><img src={pic} alt=""/></div>);
  const buttons = choices.map( (choice) =>
    <Choice onClick={() => onGuess(qid, choice.taxonId)}>
      <div>
        {choice.name + " " + choice.commonName}
      </div>
    </Choice>
  );
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