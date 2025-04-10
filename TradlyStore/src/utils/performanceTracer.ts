import perf, { FirebasePerformanceTypes } from '@react-native-firebase/perf';

/**
 * Initiates a custom performance trace with the specified name.
 *
 * @param {string} name - The name of the trace.
 * @returns {Promise<{ trace: FirebasePerformanceTypes.Trace; traceStop: any }>}
 * An object containing the trace instance and a function to stop the trace.
 * The traceStop function should be called to stop the trace when it is no longer needed.
 */
export const customTrace = async (
  name: string,
): Promise<{ trace: FirebasePerformanceTypes.Trace; traceStop: any }> => {
  // Define & start a trace
  const trace = await perf().startTrace(name);

  return {
    trace,
    // Stop the trace
    traceStop: trace.stop(),
  };
};
