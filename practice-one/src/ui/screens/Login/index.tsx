import { useCallback, useState } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { styles } from './styles';

// Apis
import { useAuthLogin } from '@/apis';

// Components
import { Text } from '@/ui/components';
import { FormLogin } from '@/ui/sections';

// Constants
import { BRAND, ERROR_MESSAGES, SCREEN_ROUTES } from '@/constants';

// Themes
import { spacing } from '@/ui/themes';

// Interfaces
import { AuthPayload } from '@/interfaces';

export const Login = () => {
  const [error, setError] = useState<string>('');

  const { mutate, isPending } = useAuthLogin();

  const handleSubmit = useCallback(
    (payload: AuthPayload) => {
      if (error) setError('');
      mutate(payload, {
        onSuccess: () => {
          router.replace(SCREEN_ROUTES.HOME);
        },
        onError: () => {
          setError(ERROR_MESSAGES.EMAIL_PASSWORD_INVALID);
        },
      });
    },
    [error, mutate],
  );

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        extraKeyboardSpace={50}
        contentContainerStyle={[styles.content, { flexGrow: 1 }]}
      >
        <View style={[{ gap: 66, marginBottom: 45 }, styles.textWrapper]}>
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

        <View style={[{ gap: 45, marginTop: spacing[8] }, styles.textWrapper]}>
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
