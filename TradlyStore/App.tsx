import { useCallback, useEffect, useState } from 'react';
import BootSplash from 'react-native-bootsplash';
import * as Keychain from 'react-native-keychain';
import crashlytics from '@react-native-firebase/crashlytics';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  RenderPassReport,
  PerformanceProfiler,
} from '@shopify/react-native-performance';

// Navigation
import { Navigation } from '@/navigation';

// Constants
import { ENABLE_STORYBOOK, SCREENS, STORAGE_KEY } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

// Utils
import { registerNotificationHandlers } from '@/utils';

const App = () => {
  const [initialScreenPublic, setInitialScreenPublic] = useState<
    typeof SCREENS.LOGIN | typeof SCREENS.ONBOARDING
  >(SCREENS.LOGIN);

  // Stores
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const onReportPrepared = useCallback((report: RenderPassReport) => {
    console.log('report', report);
  }, []);

  useEffect(() => {
    /**
     * Checks if the user is authenticated by retrieving the user's token from the device's
     * Keychain.
     * If the token is found, the user is considered authenticated
     * If the token is not found, the user is considered not authenticated
     */
    const init = async () => {
      const token = await Keychain.getGenericPassword({
        service: STORAGE_KEY.TOKEN,
      });
      const firstLogin = await Keychain.getGenericPassword({
        service: STORAGE_KEY.FIRST_LOGIN,
      });

      if (typeof token !== 'boolean') {
        setAuthenticated(!!token.password);
      } else {
        setAuthenticated(false);
        if (typeof firstLogin !== 'boolean') {
          setInitialScreenPublic(SCREENS.LOGIN);
        } else {
          setInitialScreenPublic(SCREENS.ONBOARDING);
        }
      }
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
    registerNotificationHandlers();
    crashlytics().log('App mounted.');
  }, [setAuthenticated]);

  if (ENABLE_STORYBOOK === 'true') {
    const StorybookUI = require('./.storybook').default;

    return <StorybookUI />;
  }

  return (
    <PerformanceProfiler onReportPrepared={onReportPrepared}>
      <KeyboardProvider>
        <Navigation initialScreenPublic={initialScreenPublic} />
      </KeyboardProvider>
    </PerformanceProfiler>
  );
};

export default App;
