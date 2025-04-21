import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

// Navigation
import { Navigation } from '@/navigation';

// Hooks
import { useAppInit, useToggleStorybook } from '@/hooks';

__DEV__ && require('./reactotronConfig.js');

const messaging = getMessaging(getApp());

setBackgroundMessageHandler(messaging, async () => {});

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
