import React, { useEffect, useState } from 'react';
import { useMutation } from 'graphql-hooks';

import Grid from '@material-ui/core/Grid';

import Question from './Question.js';
import Panel from './Panel.js';

const CREATE_QUIZ = `
  mutation ($taxonIds: [ID]!) {
    createQuiz(taxonIds: $taxonIds) {
      quizId
      questions {
        questionId
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
  }
`;

const MAKE_GUESS = `
  mutation($questionId: ID!, $taxonId: ID!) {
    makeGuess(questionId: $questionId, taxonId: $taxonId)
  }
`;

export default function Quiz() {
  const [makeGuess, {loading: loadingGuess}] = useMutation(MAKE_GUESS);
  const [selection, setSelection] = useState(null);
  const [guess, setGuess] = useState(null);
  const [qIndex, setQIndex] = useState(0);

  const [createQuiz, { loading, error, data }] = useMutation(CREATE_QUIZ);
  useEffect(() => {
    createQuiz({variables: { taxonIds: [47347, 67752, 63538] } });
  }, [createQuiz]);

  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened: ' + JSON.stringify(error, undefined, 2);
  if (!data) return 'Initial load...';
  if (qIndex >= data.createQuiz.questions.length) return 'You finished the quiz!';

  const question = data.createQuiz.questions[qIndex];

  const submitGuess = async() => {
    const resp = await makeGuess({ variables: { questionId: question.questionId, taxonId: selection }});
    if (resp.data) {
      setGuess(resp.data.makeGuess);
    }
  }

  const onContinue = async() => {
    setGuess(null);
    setSelection(null);
    setQIndex(qIndex+1);
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Question
        guess={guess}
        disabled={loadingGuess}
        questionId={question.questionId}
        photos={question.photos}
        choices={question.choices}
        onSelected={(taxonId) => setSelection(taxonId)}
      />
      <Panel
        guess={guess}
        selection={selection}
        onSubmit={submitGuess}
        onContinue={onContinue} />
    </Grid>);
  }