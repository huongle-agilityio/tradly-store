import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { PermissionsAndroid } from 'react-native';
import * as Keychain from 'react-native-keychain';
import messaging from '@react-native-firebase/messaging';
import { KeyboardProvider } from 'react-native-keyboard-controller';

// Navigation
import { Navigation } from '@/navigation';

// Constants
import { ENABLE_STORYBOOK, STORAGE_KEY } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

const App = () => {
  // Stores
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    /**
     * Requests user permissions for posting notifications and other messaging-related permissions.
     * This function uses `PermissionsAndroid` to request POST_NOTIFICATIONS permission and
     * `messaging().requestPermission()` to request necessary messaging permissions.
     */
    const requestUserPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      await messaging().requestPermission();
    };

    requestUserPermission();
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

      if (typeof token !== 'boolean') {
        return setAuthenticated(!!token.password);
      }

      setAuthenticated(false);
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, [setAuthenticated]);

  if (ENABLE_STORYBOOK === 'true') {
    const StorybookUI = require('./.storybook').default;

    return <StorybookUI />;
  }

  return (
    <KeyboardProvider>
      <Navigation />
    </KeyboardProvider>
  );
};

export default App;
