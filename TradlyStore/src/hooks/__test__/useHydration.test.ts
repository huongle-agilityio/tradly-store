import { act, renderHook } from '@testing-library/react-native';
import { useHydration } from '../useHydration';
import { useAuthStore, useIniStore } from '@/stores';

// Mock the stores and their hydration methods
jest.mock('@/stores', () => ({
  useAuthStore: {
    persist: {
      onFinishHydration: jest.fn(),
      hasHydrated: jest.fn(),
    },
  },
  useIniStore: {
    persist: {
      onFinishHydration: jest.fn((callback) => callback()),
      hasHydrated: jest.fn(),
    },
  },
}));

describe('useHydration', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock onFinishHydration to return a cleanup function
    useAuthStore.persist.onFinishHydration = jest.fn(() => jest.fn());
    useIniStore.persist.onFinishHydration = jest.fn(() => jest.fn());

    // Mock hasHydrated as needed
    (useAuthStore.persist.hasHydrated as jest.Mock).mockReturnValue(false);
    (useIniStore.persist.hasHydrated as jest.Mock).mockReturnValue(false);
  });

  it('Should return true when both stores are hydrated', async () => {
    // Mock hasHydrated to return true for both stores
    (useAuthStore.persist.hasHydrated as jest.Mock).mockReturnValue(true);
    (useIniStore.persist.hasHydrated as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useHydration());

    // Ensure both stores are considered hydrated
    expect(result.current).toBe(true);
  });

  it('Should return false if one of the stores is not hydrated', async () => {
    // Mock hasHydrated: auth store is hydrated, init store is not
    (useAuthStore.persist.hasHydrated as jest.Mock).mockReturnValue(true);
    (useIniStore.persist.hasHydrated as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useHydration());

    // Ensure the result is false because one store is not hydrated
    expect(result.current).toBe(false);
  });

  it('Should return false if both stores are not hydrated', async () => {
    // Mock hasHydrated to return false for both stores
    (useAuthStore.persist.hasHydrated as jest.Mock).mockReturnValue(false);
    (useIniStore.persist.hasHydrated as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useHydration());

    // Ensure the result is false because both stores are not hydrated
    expect(result.current).toBe(false);
  });

  it('Should update hydration state when hydration completes', async () => {
    // Mock hasHydrated initially as false and then simulate the completion
    (useAuthStore.persist.hasHydrated as jest.Mock).mockReturnValue(false);
    (useIniStore.persist.hasHydrated as jest.Mock).mockReturnValue(false);

    const { result, rerender } = renderHook(() => useHydration());

    // Initially, both stores are not hydrated
    expect(result.current).toBe(false);

    // Simulate hydration completion for both stores
    act(() => {
      (useAuthStore.persist.onFinishHydration as jest.Mock).mock.calls[0][0]();
      (useIniStore.persist.onFinishHydration as jest.Mock).mock.calls[0][0]();
    });

    // Rerender the hook to reflect the new state after hydration
    rerender(undefined);

    // Now, both stores should be hydrated
    expect(result.current).toBe(true);
  });

  it('Should handle the cleanup function correctly', () => {
    // Mock hasHydrated for both stores
    (useAuthStore.persist.hasHydrated as jest.Mock).mockReturnValue(true);
    (useIniStore.persist.hasHydrated as jest.Mock).mockReturnValue(true);

    const { unmount } = renderHook(() => useHydration());

    // Ensure the cleanup function is called
    act(() => {
      unmount();
    });

    // Check that the cleanup functions are properly called
    expect(useAuthStore.persist.onFinishHydration).toHaveBeenCalled();
    expect(useIniStore.persist.onFinishHydration).toHaveBeenCalled();
  });
});
