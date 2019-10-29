import React from 'react';

export default function Submit({onClick, disabled}) {
  let className = "submit";
  if (disabled) {
    className += " submit-disabled";
  }
  return (
    <div
      onClick={() => !disabled && onClick()}
      className={className}>
      SUBMIT
    </div>);
}