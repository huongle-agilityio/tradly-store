import { memo, useState } from 'react';

// Navigation
import { Navigation } from '@/navigation';

// Constants
import { SCREENS } from '@/constants';

// Hooks
import { useAppInit, useToggleStorybook } from '@/hooks';

// Utils
import { logPerformanceReport } from '@/utils';

__DEV__ && require('./reactotronConfig.js');

const PerformanceProfiler = __DEV__
  ? require('@shopify/react-native-performance').PerformanceProfiler
  : null;

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

  return __DEV__ ? (
    <PerformanceProfiler onReportPrepared={logPerformanceReport}>
      <AppContent initialScreenPublic={initialScreenPublic} />
    </PerformanceProfiler>
  ) : (
    <AppContent initialScreenPublic={initialScreenPublic} />
  );
};

export default App;
