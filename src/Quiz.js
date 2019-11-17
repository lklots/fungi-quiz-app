import React, { useEffect, useState } from 'react';
import { useMutation } from 'graphql-hooks';
import {  useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Question from './Question.js';
import Panel from './Panel.js';
import Progress from './Progress.js';

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
  const { taxonId } = useParams();
  const [makeGuess, {loading: loadingGuess}] = useMutation(MAKE_GUESS);
  const [selection, setSelection] = useState(null);
  const [guess, setGuess] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [createQuiz, { loading, error, data }] = useMutation(CREATE_QUIZ);
  useEffect(() => {
    createQuiz({variables: { taxonIds: [taxonId] } });
  }, [createQuiz, taxonId]);

  if (loading || !data) {
    return <Progress />;
  }
  if (error) return 'Something Bad Happened: ' + JSON.stringify(error, undefined, 2);
  if (questionIndex >= data.createQuiz.questions.length) return 'You finished the quiz!';

  const question = data.createQuiz.questions[questionIndex];

  const submitGuess = async() => {
    const resp = await makeGuess({ variables: { questionId: question.questionId, taxonId: selection }});
    if (resp.data) {
      setGuess(resp.data.makeGuess);
    }
  }

  const onContinue = async() => {
    setGuess(null);
    setSelection(null);
    setQuestionIndex(questionIndex+1);
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Question
        key={question.questionId}
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