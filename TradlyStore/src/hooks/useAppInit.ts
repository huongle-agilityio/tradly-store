import { DevSettings } from 'react-native';
import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import BootSplash from 'react-native-bootsplash';
import crashlytics from '@react-native-firebase/crashlytics';

// Constants
import { SCREENS, STORAGE_KEY } from '@/constants';

// Store
import { useAuthStore } from '@/stores';

// Utils
import { registerNotificationHandlers } from '@/utils';

/**
 * Initializes the app, checking if a token exists and setting the initial screen
 * accordingly. If a token exists, the user is considered authenticated. If not, the
 * app checks if the user has logged in before. If they have, the login screen is shown.
 * If not, the onboarding screen is shown. Finally, the SplashScreen is hidden and
 * notification handlers are registered.
 *
 * @param {Function} setInitialScreenPublic - A function that sets the initial screen
 *   of the app to either the login screen or the onboarding screen.
 */
export const useAppInit = (
  setInitialScreenPublic: (
    name: typeof SCREENS.LOGIN | typeof SCREENS.ONBOARDING,
  ) => void,
) => {
  // Stores
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    /**
     * Initializes the app, checking if a token exists and setting the initial screen
     * accordingly. If a token exists, the user is considered authenticated. If not, the
     * app checks if the user has logged in before. If they have, the login screen is shown.
     * If not, the onboarding screen is shown. Finally, the SplashScreen is hidden and
     * notification handlers are registered.
     */
    const init = async () => {
      try {
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

          // Check if the user has logged in before
          if (typeof firstLogin !== 'boolean') {
            setInitialScreenPublic(SCREENS.LOGIN);
          } else {
            setInitialScreenPublic(SCREENS.ONBOARDING);
          }
        }

        crashlytics().log('App mounted.');

        // Setup notification handlers
        registerNotificationHandlers();

        // Hide SplashScreen
        await BootSplash.hide({ fade: true });
      } catch (error) {
        crashlytics().recordError(error as Error);
      }
    };

    init();
  }, [setAuthenticated, setInitialScreenPublic]);
};

/**
 * Hook to toggle Storybook visibility.
 *
 * Adds a menu item to the React Native developer menu to toggle Storybook
 * visibility. Returns a boolean indicating whether Storybook is currently
 * visible or not.
 *
 * @returns {boolean} Whether Storybook is currently visible or not.
 */
export const useToggleStorybook = () => {
  const [showStorybook, setShowStorybook] = useState(false);

  useEffect(() => {
    DevSettings.addMenuItem('Toggle Storybook', () => {
      setShowStorybook((prev) => !prev);
    });
  }, []);

  return showStorybook;
};
