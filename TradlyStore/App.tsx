// Navigation
import { Navigation } from '@/navigation';

// Hooks
import { useAppInit, useToggleStorybook } from '@/hooks';

__DEV__ && require('./reactotronConfig.js');

const App = () => {
  useAppInit();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const showStorybook = __DEV__ ? useToggleStorybook() : false;

  if (showStorybook) {
    const StorybookUI = require('./.storybook').default;
    return <StorybookUI />;
  }

  return <Navigation />;
};

export default App;
