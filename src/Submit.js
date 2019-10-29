import React from 'react';

import './Submit.css';

export default function Submit({onClick, disabled, children}) {
  let className = "submit";
  if (disabled) {
    className += " submit-disabled";
  }
  return (
    <div
      onClick={() => !disabled && onClick()}
      className={className}>
      {children}
    </div>);
}