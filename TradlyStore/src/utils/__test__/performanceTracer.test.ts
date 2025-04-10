import perf from '@react-native-firebase/perf';
import { customTrace } from '../performanceTracer';

jest.mock('@react-native-firebase/perf', () => {
  const startTraceMock = jest.fn(async () => ({
    stop: jest.fn(),
  }));

  const perfMock = jest.fn(() => ({
    startTrace: startTraceMock,
  }));

  return {
    __esModule: true,
    default: perfMock,
    FirebasePerformanceTypes: {},
  };
});

describe('customTrace', () => {
  it('should start and return a trace and stop function', async () => {
    const { trace, traceStop } = await customTrace('test-trace');

    expect(trace.stop).toBeDefined();
    expect(traceStop).toBeUndefined();

    const mockPerfInstance = (perf as unknown as jest.Mock)();
    expect(mockPerfInstance.startTrace).toHaveBeenCalledWith('test-trace');
  });
});
