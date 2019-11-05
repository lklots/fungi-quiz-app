import React, { useEffect, useState } from 'react';
import { useMutation } from 'graphql-hooks';

import Grid from '@material-ui/core/Grid';

import Question from './Question.js';
import Panel from './Panel.js';

const CREATE_QUESTION = `
  mutation($taxonId: ID!) {
    createQuestion(taxonId: $taxonId) {
      qid
      photos {
        url
        origWidth
        origHeight
      }
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
  const [createQuestion, { loading, error, data }] = useMutation(CREATE_QUESTION);
  useEffect(() => createQuestion({variables: { taxonId: 47347 }}), []);

  const [makeGuess] = useMutation(MAKE_GUESS);
  const [selection, setSelection] = useState(null);
  const [guess, setGuess] = useState(null);

  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened: ' + JSON.stringify(error, undefined, 2);
  if (!data) return 'Initial load...';

  const submitGuess = async() => {
    const resp = await makeGuess({ variables: { qid: data.createQuestion.qid, taxonId: selection }});
    if (resp.data) {
      setGuess(resp.data.makeGuess);
    }
  }

  const onContinue = async() => {
    await createQuestion({ variables: { taxonId: 47347 }});
    setGuess(null);
    setSelection(null);
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Question
      guess={guess}
      qid={data.createQuestion.qid}
      photos={data.createQuestion.photos}
      choices={data.createQuestion.choices}
      onSelected={(taxonId) => setSelection(taxonId)}
    />
      <Panel
      guess={guess}
      selection={selection}
      onSubmit={submitGuess}
      onContinue={onContinue} />
    </Grid>);
  }