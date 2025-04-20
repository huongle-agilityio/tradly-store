import perf from '@react-native-firebase/perf';
import { useFocusEffect } from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-native';
import { useScreenTrace } from '../useScreenTrace';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));

describe('useScreenTrace', () => {
  const mockStartScreenTrace = jest.fn();
  const mockStop = jest.fn();
  const focusCallbacks: (() => void)[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
    (perf as unknown as jest.Mock).mockReturnValue({
      startScreenTrace: mockStartScreenTrace,
    });

    (useFocusEffect as jest.Mock).mockImplementation((cb: () => () => void) => {
      focusCallbacks.push(cb);
    });
  });

  it('Should start and stop screen trace correctly', async () => {
    mockStartScreenTrace.mockResolvedValue({ stop: mockStop });

    renderHook(() => useScreenTrace('HomeScreen'));

    let cleanup: (() => void) | void = undefined;
    await act(async () => {
      cleanup = await focusCallbacks[0]();
    });

    expect(mockStartScreenTrace).toHaveBeenCalledWith('HomeScreen');

    if (typeof cleanup === 'function') {
      await act(async () => {
        await cleanup!();
      });
    }

    expect(mockStop).toHaveBeenCalled();
  });

  it('Should handle error when startScreenTrace fails', async () => {
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    mockStartScreenTrace.mockRejectedValue(new Error('Start failed'));

    renderHook(() => useScreenTrace('ErrorScreen'));

    await act(async () => {
      await focusCallbacks[0]();
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'startScreenTrace failed',
      expect.any(Error),
    );

    consoleWarnSpy.mockRestore();
  });

  it('Should handle case when trace is null in stop function', async () => {
    mockStartScreenTrace.mockResolvedValue(null);

    renderHook(() => useScreenTrace('HomeScreen'));

    let cleanup: (() => void) | void = undefined;
    await act(async () => {
      cleanup = await focusCallbacks[0]();
    });

    // Simulate stopping the trace (which should not call stop because trace is null)
    if (typeof cleanup === 'function') {
      await act(async () => {
        await cleanup!();
      });
    }

    expect(mockStop).not.toHaveBeenCalled();
  });

  it('Should handle error when stopScreenTrace fails', async () => {
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    mockStartScreenTrace.mockResolvedValue({
      stop: jest.fn().mockRejectedValue(new Error('Stop failed')),
    });

    renderHook(() => useScreenTrace('ErrorScreen'));

    let cleanup: (() => void) | void = undefined;
    await act(async () => {
      cleanup = await focusCallbacks[0]();
    });

    if (typeof cleanup === 'function') {
      await act(async () => {
        await cleanup!();
      });
    }

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'stopScreenTrace failed',
      expect.any(Error),
    );

    consoleWarnSpy.mockRestore();
  });
});
