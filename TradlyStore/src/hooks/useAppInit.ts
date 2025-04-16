import { DevSettings } from 'react-native';
import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import BootSplash from 'react-native-bootsplash';
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { STORAGE_KEY } from '@/constants';

// Store
import { useAuthStore } from '@/stores';

// Utils
import { clearImagePickerFiles, registerNotificationHandlers } from '@/utils';

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
  setIsFirstLogin: (isFirstLogin: boolean) => void,
) => {
  // Stores
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    clearImagePickerFiles();

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

        const isFirstLogin = await AsyncStorage.getItem(
          STORAGE_KEY.FIRST_LOGIN,
        );

        if (typeof token !== 'boolean') {
          setAuthenticated(!!token.password);
        } else {
          setAuthenticated(false);
        }

        // Setup notification handlers
        await registerNotificationHandlers();

        setIsFirstLogin(isFirstLogin !== 'false');
        crashlytics().log('App mounted.');

        // Hide SplashScreen
        await BootSplash.hide({ fade: true });
      } catch (error) {
        crashlytics().recordError(error as Error);
      }
    };

    init();
  }, [setAuthenticated, setIsFirstLogin]);
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
