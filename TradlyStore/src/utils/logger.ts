import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RenderPassReport } from '@shopify/react-native-performance';

// Constants
import { STORAGE_KEY } from '@/constants';

export const logPerformanceReport = async (report: RenderPassReport) => {
  if (__DEV__) {
    console.log('[Performance Report]', report);

    return;
  }

  try {
    const existingLogsString = await AsyncStorage.getItem(
      STORAGE_KEY.PERFORMANCE_KEY,
    );
    const existingLogs = existingLogsString
      ? JSON.parse(existingLogsString)
      : [];

    const newLogs = [
      ...existingLogs,
      {
        screen: report.destinationScreen,
        timeToBootJsMillis: report.timeToBootJsMillis,
        timeToRenderMillis: report.timeToRenderMillis,
        timestamp: Date.now(),
      },
    ];

    await AsyncStorage.setItem(
      STORAGE_KEY.PERFORMANCE_KEY,
      JSON.stringify(newLogs),
    );
  } catch (error) {
    console.log('Failed to log performance', error);
  }
};

export const getPerformanceLogs = async () => {
  const logsString = await AsyncStorage.getItem(STORAGE_KEY.PERFORMANCE_KEY);
  return logsString ? JSON.parse(logsString) : [];
};

export const clearPerformanceLogs = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY.PERFORMANCE_KEY);
};
