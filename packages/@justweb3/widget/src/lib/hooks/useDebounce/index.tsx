import React from 'react';

export const useDebounce = <T,>(value: T, delay: number): { debouncedValue: T, isDebouncing: boolean } => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  const [isDebouncing, setIsDebouncing] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(handler);
      setIsDebouncing(false);
    };
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
};