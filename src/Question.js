import React from 'react';
import Slider from "react-slick";
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './question.css';

export default function Question({qid, pics, choices, onGuess }) {
  const images = pics.map( (pic) => <div><img src={pic} alt=""/></div>);
  const buttons = choices.map( (choice) =>
    <Button variant="outline-primary" size="lg" onClick={() => onGuess(qid, choice.taxonId)}>
      {choice.name + " " + choice.commonName}
    </Button>
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