import React from 'react';
import { useCountDown } from '../src';

export const CountDown = () => {
  const [val1, restart1] = useCountDown();
  const [val2, restart2] = useCountDown(20);

  return (
    <>
      <button type="button" disabled={val1 > 0} onClick={restart1}>
        CountDown1 {val1}
      </button>

      <br />
      <br />

      <button type="button" onClick={restart2}>
        CountDown2 {val2}
      </button>
    </>
  );
};
