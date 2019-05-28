import { useState, useEffect } from 'react';
import { T } from 'ramda';

export const useCountDown = (startVal: number = 10): [number, () => void] => {
  const [val, setVal] = useState(0);

  const restart = () => setVal(startVal);
  const tick = () => setVal(val - 1);

  useEffect(() => {
    if (val === 0) return T;

    const timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, [val]);

  return [val, restart];
};
