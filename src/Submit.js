import React, { useState } from 'react';

import './Submit.css';

export default function Submit({onClick, disabled, children}) {
  let className = "submit";
  if (disabled) {
    className += " submit-disabled";
  }

  const [isSubmitting, setSubmitting] = useState(false);

  const handler = async() => {
    if (disabled || isSubmitting) {
      return;
    }
    setSubmitting(true);
    await onClick();
    setSubmitting(false);
  }
  return (
    <div
      onClick={handler}
      className={"noSelect " + className}>
      {children}
    </div>);
}