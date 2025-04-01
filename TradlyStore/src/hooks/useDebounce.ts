import { useEffect, useState } from 'react';

/**
 * A custom hook that debounces a value by a specified delay.
 *
 * @template T - The type of the value to debounce.
 * @param {T} value - The value to be debounced.
 * @param {number} delay - The delay in milliseconds for the debounce.
 * @returns {T} - The debounced value.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Cancel the timeout if value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
