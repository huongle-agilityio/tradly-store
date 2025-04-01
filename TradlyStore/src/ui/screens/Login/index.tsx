import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { styles } from './styles';

// Apis
import { useAuthLogin } from '@/apis';

// Components
import { Text } from '@/ui/components';
import { FormLogin } from '@/ui/sections';

// Constants
import { BRAND, ERROR_MESSAGES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

// Interfaces
import { AuthPayload } from '@/interfaces';

export const Login = () => {
  const [error, setError] = useState<string>('');

  // Apis
  const { mutate, isPending } = useAuthLogin();

  // Stores
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const handleSubmit = useCallback(
    async (payload: AuthPayload) => {
      setAuthenticated(true);
      if (error) setError('');
      mutate(payload, {
        onError: () => {
          setError(ERROR_MESSAGES.EMAIL_PASSWORD_INVALID);
        },
      });
    },
    [error, mutate, setAuthenticated],
  );

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        extraKeyboardSpace={50}
        contentContainerStyle={[styles.content]}
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
