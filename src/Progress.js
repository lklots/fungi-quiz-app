import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

export default function Progress() {
  return (
    <Grid container alignItems="center" justify="center">
      <CircularProgress thickness={2} size="10rem" />
    </Grid>
  );
}