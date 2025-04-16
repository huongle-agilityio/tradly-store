import { useState } from 'react';
import {
  PerformanceProfiler,
  RenderPassReport,
} from '@shopify/react-native-performance';

// Navigation
import { Navigation } from '@/navigation';

// Hooks
import { useAppInit, useToggleStorybook } from '@/hooks';

// Utils
import { createReport } from '@/apis/report';
import { CrashlyticsTestButton } from '@/ui/Test';

__DEV__ && require('./reactotronConfig.js');

const App = () => {
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
  useAppInit(setIsFirstLogin);

  const handleReport = async (report: RenderPassReport) => {
    if (__DEV__) {
      console.log('[Performance Report]', report);

      return;
    }

    if (report.renderPassName !== 'interactive') {
      return;
    }

    const payload = {
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
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
      <CrashlyticsTestButton />
      <Navigation isFirstLogin={isFirstLogin} />
    </PerformanceProfiler>
  );
};

export default App;
