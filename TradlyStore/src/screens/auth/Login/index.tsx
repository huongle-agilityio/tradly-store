import { useCallback, useState } from 'react';
import notifee from '@notifee/react-native';
import * as Keychain from 'react-native-keychain';
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GestureResponderEvent,
  useStartProfiler,
} from '@shopify/react-native-performance';

// Apis
import { useAuthLogin } from '@/apis';

// Components
import { Content } from './components/Content';

// Constants
import { ERROR_MESSAGES, SCREENS, STORAGE_KEY } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

// Hooks
import { useScreenTrace } from '@/hooks';

// Interfaces
import { AuthPayload } from '@/interfaces';

// Utils
import {
  checkAndRequestNotificationPermission,
  customTrace,
  registerNotificationHandlers,
} from '@/utils';

export const Login = () => {
  const startNavigationTTITimer = useStartProfiler();

  useScreenTrace(SCREENS.LOGIN);
  const [error, setError] = useState<string>('');

  // Stores
  const [setUser, setIsAuthenticated] = useAuthStore((state) => [
    state.setUser,
    state.setAuthenticated,
  ]);

  // Apis
  const { mutate, isPending } = useAuthLogin();

  const handleSubmit = useCallback(
    async (payload: AuthPayload, uiEvent?: GestureResponderEvent) => {
      crashlytics().log('User login attempt.');
      const { trace, traceStop } = await customTrace(SCREENS.LOGIN);

      if (error) setError('');

      mutate(payload, {
        onSuccess: async ({ jwt, user }) => {
          startNavigationTTITimer({
            source: SCREENS.LOGIN,
            uiEvent,
          });

          const isFirstLogin = await AsyncStorage.getItem(
            STORAGE_KEY.FIRST_LOGIN,
          );

          // Setup notification handlers
          if (isFirstLogin !== 'false') {
            await notifee.requestPermission();
            await registerNotificationHandlers();
          } else {
            await checkAndRequestNotificationPermission();
          }

          // Set the user's token and first login in Keychain
          await Promise.all([
            Keychain.setGenericPassword(STORAGE_KEY.TOKEN, jwt, {
              service: STORAGE_KEY.TOKEN,
            }),
            AsyncStorage.setItem(STORAGE_KEY.FIRST_LOGIN, 'false'),
          ]);
          setUser(user);
          setIsAuthenticated(true);

          // custom trace
          trace.putAttribute('login_status', 'success');
          await traceStop();

          // Crashlytics
          crashlytics().log('User login success.');
          await Promise.all([
            crashlytics().setUserId(user.documentId || user.id),
            crashlytics().setAttributes({
              email: user.email,
              loginMethod: 'email_password',
            }),
          ]);
        },
        onError: async (error) => {
          setError(ERROR_MESSAGES.EMAIL_PASSWORD_INVALID);

          // custom trace
          trace.putAttribute('login_status', 'failure');
          await traceStop();

          // Crashlytics
          crashlytics().recordError(new Error(error));
        },
      });
    },
    [error, mutate, setIsAuthenticated, setUser, startNavigationTTITimer],
  );

  return (
    <Content isPending={isPending} error={error} onSubmit={handleSubmit} />
  );
};
