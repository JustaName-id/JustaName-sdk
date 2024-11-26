import { useEffect, useRef, useState } from 'react';

export const useDebounced = <T>(
  value: T,
  delay: number
): { value: T; isDebouncing: boolean } => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const firstUpdate = useRef(true);
  const prevValue = useRef(value);

  useEffect(() => {
    if (firstUpdate.current || prevValue.current === value) {
      firstUpdate.current = false;
      prevValue.current = value;
      return;
    }

    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    prevValue.current = value;

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return {
    value: debouncedValue,
    isDebouncing,
  };
};
