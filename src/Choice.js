import React from 'react';

import './Choice.css';

export default function Choice({ color, title, subtitle, onClick }) {
  return (
    <div className={"choice noSelect choice-"+color} onClick={onClick}>
      <span className="choice-title">
        {title}
      </span>
      <span className="choice-subtitle">
        ({subtitle})
      </span>
    </div>
  );
}

