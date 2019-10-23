import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Choice({ onClick, children, mode }) {

  const [isLoading, setLoading] = useState(false);
  const handler = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  let variant;
  if (mode === 'correct') {
    variant = 'success'
  } else if (mode === 'incorrect') {
    variant = 'danger';
  } else {
    variant = 'outline-primary'
  }
  return (
    <Button
      variant={variant}
      size="lg"
      disabled={isLoading || mode !== 'unselected'}
      onClick={() => handler()}>
      {children}
    </Button>
  );
}