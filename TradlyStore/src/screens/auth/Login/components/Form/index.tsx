import { StyleSheet, View } from 'react-native';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { GestureResponderEvent } from '@shopify/react-native-performance';

// Components
import { Button, InputController, Text } from '@/components/common';

// Hooks
import { useFocusInput } from '@/hooks';

// Schema
import { loginSchema } from '@/schemas';

// Themes
import { spacing } from '@/themes';

interface FormData {
  email: string;
  password: string;
}

interface FormProps {
  error?: string;
  isLoading?: boolean;
  onSubmit: (data: FormData, uiEvent?: GestureResponderEvent) => void;
}

export const Form = memo(({ error, isLoading, onSubmit }: FormProps) => {
  const { focusNextInput, refs } = useFocusInput(2);

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
    <View style={styles.wrapper}>
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <InputController
            index={0}
            refs={refs}
            name="email"
            keyboardType="email-address"
            placeholder="Enter your email"
            onFocusNextInput={focusNextInput}
            control={control}
            clearErrors={clearErrors}
          />
          <InputController
            index={1}
            refs={refs}
            name="password"
            placeholder="Enter your password"
            onFocusNextInput={focusNextInput}
            control={control}
            secureTextEntry={true}
            clearErrors={clearErrors}
          />
        </View>
        {error && (
          <Text color="error" textStyle={styles.error}>
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
});

const styles = StyleSheet.create({
  wrapper: {
    gap: 38,
  },
  formWrapper: { gap: spacing['2.5'] },
  inputWrapper: { gap: spacing[4] },
  error: { paddingHorizontal: spacing[2] },
});
