import { renderHook } from '@testing-library/react-native';

// Hooks
import { useDebounce } from '../useDebounce';

describe('Testing useDebounce function', () => {
  jest.useFakeTimers();
  test('Should update the debouncedValue after the set delay', () => {
    const mockValue = 'value';
    const mockDelay = 1000;
    const { result } = renderHook(() => useDebounce(mockValue, mockDelay));

    expect(result.current).toBe(mockValue);
    jest.advanceTimersByTime(mockDelay);
    expect(result.current).toBe(mockValue);
  });

  test('Should return the initial value if the delay is not provided', () => {
    const mockValue = 'value';
    const mockDelay = 1000;
    const { result } = renderHook(() => useDebounce(mockValue, mockDelay));

    expect(result.current).toBe(mockValue);
    jest.advanceTimersByTime(500);
    expect(result.current).toBe(mockValue);
  });
});
