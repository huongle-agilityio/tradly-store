import { DevSettings } from 'react-native';
import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import BootSplash from 'react-native-bootsplash';
import crashlytics from '@react-native-firebase/crashlytics';
import { useHydration } from './useHydration';

// Constants
import { STORAGE_KEY } from '@/constants';

// Store
import { useAuthStore, useIniStore } from '@/stores';

// Utils
import { clearImagePickerFiles, createNotificationChannel } from '@/utils';

/**
 * Custom hook to initialize the app's authentication and onboarding state.
 *
 * This hook sets up the initial authentication state based on a stored token.
 * If a token is found, the user is marked as authenticated. Otherwise, it checks
 * if the user is logging in for the first time and displays the appropriate screen
 * (login or onboarding). It also handles the cleanup of image picker files, registers
 * notification handlers, and hides the splash screen once the app is ready.
 */
export const useAppInit = () => {
  const hydrated = useHydration();

  // Stores
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const isFirstLogin = useIniStore((state) => state.isFirstLogin);

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
        await createNotificationChannel();
        const token = await Keychain.getGenericPassword({
          service: STORAGE_KEY.TOKEN,
        });

        if (typeof token !== 'boolean') {
          setAuthenticated(!!token.password);
        } else {
          setAuthenticated(false);
        }

        // Hide SplashScreen
        if (hydrated) {
          crashlytics().log('App mounted.');
          await BootSplash.hide({ fade: true });
        }
      } catch (error) {
        crashlytics().recordError(error as Error);
      }
    };

    init();
  }, [hydrated, isFirstLogin, setAuthenticated]);
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
