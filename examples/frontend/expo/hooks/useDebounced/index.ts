import { useEffect, useState } from "react";

export const useDebounced = (
  value: string,
  delay: number
): { value: string } => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return {
    value: debouncedValue,
  };
};
