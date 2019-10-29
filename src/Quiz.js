import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import delay from 'delay';
import { useMutation } from 'graphql-hooks';

import Grid from '@material-ui/core/Grid';

import Question from './Question.js';
import Submit from './Submit.js';

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

const MAKE_GUESS = `
  mutation($qid: ID!, $taxonId: ID!) {
    makeGuess(qid: $qid, taxonId: $taxonId)
  }
`;

export default function Quiz() {
  const [createQuestion, { loading, error, data}] = useMutation(CREATE_QUESTION);
  useEffect(() => createQuestion({variables: { taxonId: 47347 }}), []);

  const [makeGuess] = useMutation(MAKE_GUESS);
  const [selection, setSelection] = useState(null);
  const [answer, setAnswer] = useState(null);

  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened: ' + JSON.stringify(error, undefined, 2);
  if (!data) return 'Initial load...';

  const submitHandler = async() => {
    const resp = await makeGuess({ variables: { qid: data.createQuestion.qid, taxonId: selection }});
    if (resp.data) {
      setAnswer(resp.data.makeGuess);
    }
  }

  const continueHandler = async() => {
    const resp = await createQuestion({ variables: { taxonId: 47347 }});
    setAnswer(null);
    setSelection(null);
  }

  return (
    <Grid container direction="column " spacing={4} alignItems="center">
      <Grid item>
        <Question
          answer={answer}
          qid={data.createQuestion.qid}
          pics={data.createQuestion.pics}
          choices={data.createQuestion.choices}
          onSelected={(taxonId) => setSelection(taxonId)}
        />
      </Grid>
      <Grid container item justify="center" xs={12}>
        {answer
          ? <Submit onClick={continueHandler}>CONTINUE</Submit>
          : <Submit disabled={!selection} onClick={submitHandler}>SUBMIT</Submit>
        }
      </Grid>
    </Grid>
  );
}