import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useMutation } from 'graphql-hooks';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ReactFitText from 'react-fittext';

import Choice from './Choice.js';

const MAKE_GUESS = `
  mutation($qid: ID!, $taxonId: ID!) {
    makeGuess(qid: $qid, taxonId: $taxonId)
  }
`;

export default function Question({qid, pics, choices, onAnswer }) {
  const [makeGuess, {error, data}] = useMutation(MAKE_GUESS);
  let answer;
  if (data) {
    answer = data.makeGuess;
  }

  async function guessHandler(qid, taxonId) {
    const resp = await makeGuess({ variables: { qid, taxonId }});
    if (resp.data && !resp.error) {
      onAnswer();
    }
  }

  const images = pics.map( (pic) => <img class="carousel-img" src={pic} alt=""/>);
  const buttons = choices.map( (choice) => {
    let mode = 'unselected';
    if (!error && answer && answer === choice.taxonId) {
      mode = 'correct';
    } else if (!error && answer && answer !== choice.taxonId) {
      mode = 'incorrect';
    }
    return (
      <Choice
        mode={mode}
        onClick={() => guessHandler(qid, choice.taxonId)}>
        <ReactFitText>
          <Typography variant="h6" style={{ color: '#FEFEFE' }}>
            {choice.commonName}
          </Typography>
        </ReactFitText>
        <ReactFitText>
          <Typography variant="subtitle1" style={{ color: '#FEFEFE60' }}>
            ({choice.name})
          </Typography>
        </ReactFitText>
      </Choice>
    );
  });

  return (
    <Grid>
      <div class="carousel">
        <Slider arrows dots infinite>{images}</Slider>
      </div>
      <Grid container spacing={2} justify="center">
        <Grid item>
          {buttons[0]}
        </Grid>
        <Grid item>
          {buttons[1]}
        </Grid>
      </Grid>
    </Grid>
  );
}