import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

// Apis
import { useAuthLogin } from '@/apis';

// Components
import { Button, InputController, Text } from '@/ui/components';

// Constants
import { ERROR_MESSAGES, SCREEN_ROUTES } from '@/constants';

// Schema
import { loginSchema } from '@/schema';

// Themes
import { spacing } from '@/ui/themes';

interface FormData {
  email: string;
  password: string;
}

export const FormLogin = () => {
  const { mutate, isPending } = useAuthLogin();
  const [error, setError] = useState<string>('');

  const {
    control,
    clearErrors,
    handleSubmit: submitForm,
  } = useForm<FormData>({
    resolver: valibotResolver(loginSchema),
    mode: 'onSubmit',
  });

  const handleSubmit = ({ email, password }: FormData) => {
    if (error) setError('');
    const payload = { identifier: email, email, password };
    mutate(payload, {
      onSuccess: () => {
        router.replace(SCREEN_ROUTES.HOME);
      },
      onError: () => {
        setError(ERROR_MESSAGES.EMAIL_PASSWORD_INVALID);
      },
    });
  };

  return (
    <View style={{ gap: 38 }}>
      <View style={{ gap: spacing['2.5'] }}>
        <View style={{ gap: spacing[4] }}>
          <InputController
            name="email"
            placeholder="Enter your email"
            control={control}
            clearErrors={clearErrors}
          />
          <InputController
            name="password"
            placeholder="Enter your password"
            control={control}
            secureTextEntry={true}
            clearErrors={clearErrors}
          />
        </View>
        {error && (
          <Text color="error" textStyle={{ paddingHorizontal: spacing[2] }}>
            {error}
          </Text>
        )}
      </View>
      <Button
        color="secondary"
        textSize="lg"
        isLoading={isPending}
        buttonStyles={{ height: spacing[12] }}
        onPress={submitForm(handleSubmit)}
      >
        Login
      </Button>
    </View>
  );
};
