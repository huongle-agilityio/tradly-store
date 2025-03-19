import { TextInput } from 'react-native';
import { MutableRefObject } from 'react';
import { act, renderHook } from '@testing-library/react-native';

// Hooks
import { useFocusInput } from '../useFocusInput';

describe('useFocusInput', () => {
  it('Should create refs for the correct number of TextInputs', () => {
    const { result } = renderHook(() => useFocusInput(3));

    expect(result.current.refs.current.length).toBe(3);
    result.current.refs.current.forEach((ref) => {
      expect(ref.current).toBeNull();
    });
  });

  it('Should focus the next input when focusNextInput is called', () => {
    const { result } = renderHook(() => useFocusInput(3));

    const mockInputs = result.current.refs.current.map(() => ({
      focus: jest.fn(),
    }));

    result.current.refs.current.forEach((ref, index) => {
      (ref as MutableRefObject<TextInput>).current = mockInputs[
        index
      ] as unknown as TextInput;
    });

    act(() => {
      result.current.focusNextInput(0);
    });

    expect(mockInputs[1].focus).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.focusNextInput(1);
    });

    expect(mockInputs[2].focus).toHaveBeenCalledTimes(1);
  });

  it('Should not focus if the last input is reached', () => {
    const { result } = renderHook(() => useFocusInput(3));

    const mockInputs = result.current.refs.current.map(() => ({
      focus: jest.fn(),
    }));

    result.current.refs.current.forEach((ref, index) => {
      (ref as MutableRefObject<TextInput>).current = mockInputs[
        index
      ] as unknown as TextInput;
    });

    act(() => {
      result.current.focusNextInput(2);
    });

    expect(mockInputs[2].focus).not.toHaveBeenCalled();
  });
});
