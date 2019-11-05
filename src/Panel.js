import React from 'react';

import Grid from '@material-ui/core/Grid';

import Submit from './Submit.js';

export default function Panel({guess, selection, onSubmit, onContinue }) {
  const className =
    (guess && selection === guess && 'panel-correct') ||
    (guess && selection !== guess && 'panel-wrong') ||
    'panel-default';
  const color = (guess && selection !== guess && 'red') || 'green'
  return (
    <Grid className={"panel "+className} container direction="row" justify="center" alignItems="center">
      <Grid item xs={2}>
      {(selection && guess)
        ? <Submit onClick={onContinue} color={color}>continue</Submit>
        : <Submit disabled={!selection} onClick={onSubmit} color="green">submit</Submit>
      }
      </Grid>
    </Grid>
  );
}
