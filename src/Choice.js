import React, { useState } from 'react';

export default function Choice({ onClick, children, mode, classes, }) {
  const [isLoading, setLoading] = useState(false);
  const handler = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <div onClick={() => !isLoading && mode === 'unselected' && handler()} class={"choice " + mode}>
      {children}
    </div>
  );
}

