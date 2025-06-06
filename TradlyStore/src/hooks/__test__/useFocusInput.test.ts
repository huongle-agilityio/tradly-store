import { act, renderHook } from '@testing-library/react-native';
import { TextInput } from 'react-native';

// Hooks
import { useFocusInput } from '../useFocusInput';

describe('useFocusInput Hook', () => {
  it('Should create the correct number of refs', () => {
    const { result } = renderHook(() => useFocusInput(3));

    expect(result.current.refs.length).toBe(3);
    result.current.refs.forEach((ref) => {
      expect(ref.current).toBeNull();
    });
  });

  it('Should call focus on the next input when focusNextInput is called', () => {
    const { result } = renderHook(() => useFocusInput(3));

    // Mock current ref values
    result.current.refs[1].current = {
      focus: jest.fn(),
    } as unknown as TextInput;
    result.current.refs[2].current = {
      focus: jest.fn(),
    } as unknown as TextInput;

    act(() => {
      result.current.focusNextInput(1);
    });

    expect(result.current.refs[2].current?.focus).toHaveBeenCalled();
  });

  it('Should not call focus if index is out of bounds', () => {
    const { result } = renderHook(() => useFocusInput(3));

    result.current.refs[2].current = {
      focus: jest.fn(),
    } as unknown as TextInput;

    act(() => {
      result.current.focusNextInput(2);
    });

    expect(result.current.refs[2].current?.focus).not.toHaveBeenCalled();
  });

  it('Should not call focus if index is undefined', () => {
    const { result } = renderHook(() => useFocusInput(3));

    act(() => {
      result.current.focusNextInput(undefined);
    });

    result.current.refs.forEach((ref) => {
      expect(ref.current?.focus).toBeUndefined();
    });
  });
});
