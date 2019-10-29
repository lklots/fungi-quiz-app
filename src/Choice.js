import React from 'react';

import './Choice.css';

export default function Choice({ mode, title, subtitle, onClick }) {
  return (
    <div className={"choice noSelect choice-"+mode} onClick={() => mode === 'unselected' && onClick()}>
      <span className="choice-title">
        {title}
      </span>
      <span className="choice-subtitle">
        ({subtitle})
      </span>
    </div>
  );
}

