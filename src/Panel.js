import React from 'react';
import { config, useSpring, animated } from 'react-spring';

import Grid from '@material-ui/core/Grid';

import Submit from './Submit.js';

export default function Panel({ guess, selection, onSubmit, onContinue }) {
  const animatePanelProps = useSpring({
    from: { width: "100%", marginTop: 20, opacity: 0 },
    to: { marginTop: 0, opacity: 1 },
    config: config.wobbly
  });
  const className =
    (guess && selection === guess && 'panel-correct') ||
    (guess && selection !== guess && 'panel-wrong') ||
    'panel-default';
  const color = (guess && selection !== guess && 'red') || 'green'
  return (
    <animated.div style={animatePanelProps}>
      <Grid className={"panel "+className} container direction="row" justify="center" alignItems="center">
        <Grid item xs={4}>
          {(selection && guess)
            ? <Submit onClick={onContinue} color={color}>continue</Submit>
            : <Submit disabled={!selection} onClick={onSubmit} color="green">submit</Submit>
          }
        </Grid>
      </Grid>
    </animated.div>
  );
}
