import { memo, useState } from 'react';
import {
  PerformanceProfiler,
  RenderPassReport,
} from '@shopify/react-native-performance';

// Navigation
import { Navigation } from '@/navigation';

// Constants
import { SCREENS } from '@/constants';

// Hooks
import { useAppInit, useToggleStorybook } from '@/hooks';

// Utils
import { createReport } from '@/apis/report';

__DEV__ && require('./reactotronConfig.js');

type InitScreenPublic = typeof SCREENS.LOGIN | typeof SCREENS.ONBOARDING;

const AppContent = memo(
  ({ initialScreenPublic }: { initialScreenPublic: InitScreenPublic }) => (
    <Navigation initialScreenPublic={initialScreenPublic} />
  ),
);

const App = () => {
  const [initialScreenPublic, setInitialScreenPublic] =
    useState<InitScreenPublic>(SCREENS.LOGIN);
  useAppInit(setInitialScreenPublic);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const showStorybook = __DEV__ ? useToggleStorybook() : false;

  if (showStorybook) {
    const StorybookUI = require('./.storybook').default;
    return <StorybookUI />;
  }

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

  return (
    <PerformanceProfiler onReportPrepared={handleReport}>
      <AppContent initialScreenPublic={initialScreenPublic} />
    </PerformanceProfiler>
  );
};

export default App;
