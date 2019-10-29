import React, { useEffect } from 'react';
import _ from 'lodash';
import delay from 'delay';
import { useMutation } from 'graphql-hooks';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Question from './Question.js';

const CREATE_QUESTION = `
  mutation($taxonId: ID!) {
    createQuestion(taxonId: $taxonId) {
      qid
      pics
      choices {
        taxonId
        name
        commonName
      }
    }
  }
`;

export default function Quiz() {
  const [createQuestion, { loading, error, data}] = useMutation(CREATE_QUESTION);
  useEffect(() => createQuestion({variables: { taxonId: 47347 }}), []);
  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened: ' + JSON.stringify(error, undefined, 2);
  if (!data) return 'Initial load...';

  return (
    <Grid container direction="column " spacing={4} alignItems="center">
      <Grid item>
        <Question
          qid={data.createQuestion.qid}
          pics={data.createQuestion.pics}
          choices={_.shuffle(data.createQuestion.choices)}
          onAnswer={async() => {
            await delay(1000); // move to the next question after a wait
            createQuestion({variables: { taxonId: 47347 }});
          }}
        />
      </Grid>
      <Grid container item justify="center" xs={12}>
        <Button variant="contained" color="primary">
          Check
        </Button>
      </Grid>
    </Grid>
  );
}