import React, { useRef, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useMutation } from 'graphql-hooks';
import {useSpring, useTrail, animated, useChain} from 'react-spring'

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
  const animateContainerRef = useRef();
  const animateContainerProps = useSpring({
    ref: animateContainerRef,
    from: { marginTop: -200, opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    to: { marginTop: 0, opacity: 1, transform: 'translate3d(0, 0px, 0)' }
  });
  const animateChoicesRef = useRef();
  const animateChoicesProps = useTrail(choices.length, {
    ref: animateChoicesRef,
    from: { marginLeft: -20, opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    to: { marginLeft: 0, opacity: 1, transform: 'translate3d(0, 0px, 0)' }
  });
  useChain([animateContainerRef, animateChoicesRef], [0, 0.2]);

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

  const images = pics.map( (pic, i) => <img key={"img"+i} class="carousel-img" src={pic} alt=""/>);
  const buttons = choices.map( (choice, index) => {
    let mode = 'unselected';
    if (!error && answer && answer === choice.taxonId) {
      mode = 'correct';
    } else if (!error && answer && answer !== choice.taxonId) {
      mode = 'incorrect';
    }
    return (
      <animated.div key={"choice"+index} style={animateChoicesProps[index]}>
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
      </animated.div>
    );
  });

  return (
    <animated.div style={animateContainerProps}>
      <Grid>
        <div class="carousel-container">
            <Slider arrows dots infinite>{images}</Slider>
        </div>
        <Grid container spacing={2} justify="center">
          {
            buttons.map(b => <Grid item>{b}</Grid>)
          }
        </Grid>
      </Grid>
    </animated.div>
  );
}