import type { RenderPassReport } from '@shopify/react-native-performance';

export const logPerformanceReport = async (report: RenderPassReport) => {
  if (__DEV__) {
    console.log('[Performance Report]', report);

    return;
  }
};
