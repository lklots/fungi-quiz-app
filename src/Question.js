import React, { useRef, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import { useMutation } from 'graphql-hooks';
import {useSpring, useTrail, animated, useChain} from 'react-spring'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Choice from './Choice.js';

const MAKE_GUESS = `
  mutation($qid: ID!, $taxonId: ID!) {
    makeGuess(qid: $qid, taxonId: $taxonId)
  }
`;

export default function Question({qid, pics, choices, onAnswer }) {
  // Animation
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

  const [selected, setSelected] = useState(null);

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

  const images = pics.map( (pic, i) => <img key={"img"+i} className="carousel-img" src={pic} alt=""/>);
  const buttons = choices.map( (choice, index) => {
    let mode = 'unselected';
    if (!error && answer && answer === choice.taxonId) {
      mode = 'correct';
    } else if (!error && answer && answer !== choice.taxonId && selected === choice.taxonId) {
      mode = 'wrong';
    } else if (choice.taxonId === selected) {
      mode = 'selected';
    }

    return (
      <animated.div style={animateChoicesProps[index]}>
        <Choice
          title={choice.commonName}
          subtitle={choice.name}
          mode={mode}
          onClick={() => {
            setSelected(choice.taxonId);
            guessHandler(qid, choice.taxonId);
          }} />
      </animated.div>
    );
  });

  return (
    <animated.div style={animateContainerProps}>
      <Grid>
        <div className="carousel-container">
            <Slider arrows dots infinite>{images}</Slider>
        </div>
        <Grid container spacing={1} justify="center">
          {buttons.map((b, i) => <Grid item key={"choice"+i}>{b}</Grid>)}
        </Grid>
      </Grid>
    </animated.div>
  );
}