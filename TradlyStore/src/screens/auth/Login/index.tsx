import { useCallback, useRef, useState } from 'react';
import notifee from '@notifee/react-native';
import * as Keychain from 'react-native-keychain';
import crashlytics from '@react-native-firebase/crashlytics';
import BottomSheet from '@gorhom/bottom-sheet';
import { Linking } from 'react-native';
import { AuthorizationStatus } from '@react-native-firebase/messaging';
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
import { useAuthStore, useIniStore } from '@/stores';

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
  const sheetRef = useRef<BottomSheet>(null);

  const startNavigationTTITimer = useStartProfiler();

  useScreenTrace(SCREENS.LOGIN);
  const [error, setError] = useState<string>('');

  // Stores
  const [isFirstLogin, setIsFirstLogin] = useIniStore((state) => [
    state.isFirstLogin,
    state.setIsFirstLogin,
  ]);
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

          // Setup notification handlers
          if (isFirstLogin) {
            await notifee.requestPermission();
            await registerNotificationHandlers();
          } else {
            const permission = await checkAndRequestNotificationPermission();

            if (permission === AuthorizationStatus.DENIED) {
              sheetRef.current?.snapToIndex(0);
            }
          }

          // Set the user's token and first login in Keychain
          await Keychain.setGenericPassword(STORAGE_KEY.TOKEN, jwt, {
            service: STORAGE_KEY.TOKEN,
          });
          setUser(user);

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
    [error, isFirstLogin, mutate, setUser, startNavigationTTITimer],
  );

  const handleCloseSheet = useCallback(() => {
    setIsAuthenticated(true);
    setIsFirstLogin(false);

    sheetRef.current?.close();
  }, [setIsAuthenticated, setIsFirstLogin]);

  const handleConfirmSheet = useCallback(() => {
    setIsAuthenticated(true);
    setIsFirstLogin(false);

    Linking.openSettings();
    sheetRef.current?.close();
  }, [setIsAuthenticated, setIsFirstLogin]);

  return (
    <Content
      sheetRef={sheetRef}
      isPending={isPending}
      error={error}
      onSubmit={handleSubmit}
      onCloseSheet={handleCloseSheet}
      onConfirmSheet={handleConfirmSheet}
    />
  );
};
