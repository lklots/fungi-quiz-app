import React, { useRef, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import {useSpring, useTrail, animated, useChain} from 'react-spring';

import Choice from './Choice.js';
import Carousel from './Carousel.js';

export default function Question({qid, photos, choices, answer, onSelected }) {
  // Animation
  const animateContainerRef = useRef();
  const animateContainerProps = useSpring({
    ref: animateContainerRef,
    from: { marginLeft: 20, opacity: 0, transform: 'translate3d(40, 0px, 0)' },
    to: { marginLeft: 0, opacity: 1, transform: 'translate3d(0, 0px, 0)' }
  });
  const animateChoicesRef = useRef();
  const animateChoicesProps = useTrail(choices.length, {
    ref: animateChoicesRef,
    from: { marginLeft: -20, opacity: 0, transform: 'translate3d(40px, 0px, 0)' },
    to: { marginLeft: 0, opacity: 1, transform: 'translate3d(0, 0px, 0)' }
  });
  useChain([animateContainerRef, animateChoicesRef], [0, 0.2]);

  const [selected, setSelected] = useState(null);

  const buttons = choices.map( (choice, index) => {
    let mode = 'unselected';
    if (answer) {
      if (answer === choice.taxonId) {
        mode = 'correct';
      } else if (selected === choice.taxonId) {
        mode = 'wrong';
      } else {
        mode = 'unselected-ignore';
      }
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
            onSelected(qid, choice.taxonId);
          }} />
      </animated.div>
    );
  });

  return (
    <animated.div style={animateContainerProps}>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Carousel photos={photos} />
        </Grid>
        <Grid item container justify="center" spacing={2}>
          {buttons.map((b, i) => <Grid item key={"choice"+i}>{b}</Grid>)}
        </Grid>
      </Grid>
    </animated.div>
  );
}