import {
  PerformanceProfiler,
  RenderPassReport,
} from '@shopify/react-native-performance';
import messaging from '@react-native-firebase/messaging';

// Apis
import { createReport } from '@/apis';

// Navigation
import { Navigation } from '@/navigation';

// Hooks
import { useAppInit, useToggleStorybook } from '@/hooks';

// Utils
import { handleGetDeviceToken } from '@/utils';

__DEV__ && require('./reactotronConfig.js');

const App = () => {
  useAppInit();

  const handleReport = async (report: RenderPassReport) => {
    if (__DEV__) {
      console.log('[Performance Report]', report);
      console.log('getMessaging().getToken()', await handleGetDeviceToken());

      return;
    }

    if (report.renderPassName !== 'interactive') {
      return;
    }

    const payload = {
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
      deviceToken: await messaging().getToken(),
      report: {
        timeToRenderMillis: report.timeToRenderMillis || 0,
        timeToBootJsMillis: report.timeToBootJsMillis || 0,
      },
    };

    await createReport(payload);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const showStorybook = __DEV__ ? useToggleStorybook() : false;

  if (showStorybook) {
    const StorybookUI = require('./.storybook').default;
    return <StorybookUI />;
  }

  return (
    <PerformanceProfiler onReportPrepared={handleReport}>
      <Navigation />
    </PerformanceProfiler>
  );
};

export default App;
