import { View } from 'react-native';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

// Components
import { Button, InputController, Text } from '@/ui/components';

// Schema
import { loginSchema } from '@/schemas';

// Themes
import { spacing } from '@/ui/themes';

interface FormData {
  email: string;
  password: string;
}

interface FormLoginProps {
  error?: string;
  isLoading?: boolean;
  onSubmit: (data: FormData) => void;
}

export const FormLogin = memo(
  ({ error, isLoading, onSubmit }: FormLoginProps) => {
    const {
      control,
      clearErrors,
      handleSubmit: submitForm,
    } = useForm<FormData>({
      resolver: valibotResolver(loginSchema),
      mode: 'onSubmit',
    });

    const handleSubmit = useCallback(
      ({ email, password }: FormData) => {
        const payload = { identifier: email, email, password };
        onSubmit(payload);
      },
      [onSubmit],
    );

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
          isLoading={isLoading}
          buttonStyles={{ height: spacing[12] }}
          onPress={submitForm(handleSubmit)}
        >
          Login
        </Button>
      </View>
    );
  },
);

FormLogin.displayName = 'FormLogin';
