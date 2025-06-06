import { createRef, useRef } from 'react';
import { TextInput } from 'react-native';

/**
 * A custom hook to manage focus on multiple TextInput components.
 *
 * @param {number} count - The number of TextInput components.
 * @returns {Object} - An object containing:
 *   - `refs`: An array of refs to the TextInput components.
 *   - `focusNextInput`: A function to focus the next TextInput based on the provided index.
 */
export const useFocusInput = (count: number) => {
  const refs = useRef([...Array(count)].map(() => createRef<TextInput>()));

  const focusNextInput = (index?: number) => {
    if (index !== undefined && index < count - 1) {
      refs.current[index + 1]?.current?.focus();
    }
  };

  return { refs, focusNextInput };
};
