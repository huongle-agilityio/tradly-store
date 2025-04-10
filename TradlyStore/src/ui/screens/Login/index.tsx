import { useCallback, useState } from 'react';
import { View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import crashlytics from '@react-native-firebase/crashlytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { styles } from './styles';

// Apis
import { useAuthLogin } from '@/apis';

// Components
import { Text } from '@/ui/components';
import { FormLogin } from '@/ui/sections';

// Constants
import { BRAND, ERROR_MESSAGES, SCREENS, STORAGE_KEY } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

// Hooks
import { useScreenTrace } from '@/hooks';

// Interfaces
import { AuthPayload } from '@/interfaces';

// Utils
import { checkAndRequestNotificationPermission, customTrace } from '@/utils';

export const Login = () => {
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
    async (payload: AuthPayload) => {
      crashlytics().log('User login attempt.');
      const { trace, traceStop } = await customTrace(SCREENS.LOGIN);

      if (error) setError('');

      mutate(payload, {
        onSuccess: async ({ jwt, user }) => {
          // Set the user's token and first login in Keychain
          await Promise.all([
            Keychain.setGenericPassword(STORAGE_KEY.TOKEN, jwt, {
              service: STORAGE_KEY.TOKEN,
            }),
            Keychain.setGenericPassword(
              STORAGE_KEY.FIRST_LOGIN,
              STORAGE_KEY.FIRST_LOGIN,
              {
                service: STORAGE_KEY.FIRST_LOGIN,
              },
            ),
          ]);

          setUser(user);
          setIsAuthenticated(true);
          await checkAndRequestNotificationPermission();

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
    [error, mutate, setIsAuthenticated, setUser],
  );

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        extraKeyboardSpace={50}
        contentContainerStyle={styles.content}
      >
        <View style={[styles.title, styles.textWrapper]}>
          <Text color="light" fontSize="xxl" fontWeight="normal">
            Welcome to {BRAND.NAME}
          </Text>
          <Text color="light" fontSize="md" fontWeight="light">
            Login to your account
          </Text>
        </View>
        <FormLogin
          error={error}
          isLoading={isPending}
          onSubmit={handleSubmit}
        />

        <View style={[styles.subtitle, styles.textWrapper]}>
          <Text color="light" fontSize="lg" fontWeight="light">
            Forgot your password?
          </Text>
          <Text color="light" fontSize="lg" fontWeight="light">
            Don’t have an account?{' '}
            <Text color="light" fontSize="lg" fontWeight="medium">
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
