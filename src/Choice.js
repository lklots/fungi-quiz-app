import React from 'react';
import { Button } from 'react-bootstrap';

export const MODE = {
  LOADING: 'loading',
  CORRECT: 'correct',
  WRONG: 'wrong',
  UNSELECTED: 'unselected',
}

export default function Choice({ onClick, children }) {
  return (
    <Button variant="outline-primary" size="lg" onClick={onClick}>
      {children}
    </Button>
  );
}