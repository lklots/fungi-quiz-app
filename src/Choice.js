import React, { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

export default function Choice({ onClick, children, mode, }) {

  const [isLoading, setLoading] = useState(false);
  const handler = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  return (
    <ButtonBase style={{ "border-radius": "20%"}} onClick={() => !isLoading && mode === 'unselected' && handler()}>
      <div class={"choice " + mode}>
        {children}
      </div>
    </ButtonBase>
  );
}