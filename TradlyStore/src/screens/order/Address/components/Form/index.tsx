import { memo, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Components
import { StickyFooter } from '@/components/shared';
import { InputController, Text } from '@/components/common';

// Icons
import { TargetLocationIcon } from '@/components/icons';

// Hooks
import { AddressState, useFocusInput } from '@/hooks';

// Stores
import { useThemeStore } from '@/stores';

// Schemas
import { addressSchema } from '@/schemas';

// Themes
import { spacing } from '@/themes';

interface FormProps {
  form: AddressState;
  onSubmit: (data: AddressState) => void;
}

export const Form = memo(({ form, onSubmit }: FormProps) => {
  const { colors } = useTheme();
  const { focusNextInput, refs } = useFocusInput(6);

  // Stores
  const isDark = useThemeStore((state) => state.isDark);

  const stylesDynamic = useMemo(
    () =>
      StyleSheet.create({
        currentLocationWrapper: {
          backgroundColor: colors.backgroundSecondary,

          elevation: isDark ? 0 : spacing['2.5'],
        },
      }),
    [colors.backgroundSecondary, isDark],
  );

  const {
    control,
    clearErrors,
    formState: { isDirty },
    handleSubmit: submitForm,
  } = useForm<AddressState>({
    resolver: valibotResolver(addressSchema),
    mode: 'onSubmit',
    defaultValues: form,
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainerStyle}
    >
      <StickyFooter
        disabled={!isDirty}
        buttonText="Save"
        onPress={submitForm(onSubmit)}
      >
        <View
          style={[
            styles.currentLocationWrapper,
            stylesDynamic.currentLocationWrapper,
          ]}
        >
          <TargetLocationIcon size={24} color={colors.link} />
          <Text
            fontWeight="normal"
            color="link"
            fontSize="md"
            textStyle={styles.locationWrapper}
          >
            Use current location
          </Text>
        </View>
        <View style={styles.formWrapper}>
          <InputController
            index={0}
            refs={refs}
            name="username"
            variant="underlined"
            label="Name"
            onFocusNextInput={focusNextInput}
            placeholder="Enter your name"
            clearErrors={clearErrors}
            control={control}
          />
          <InputController
            index={1}
            refs={refs}
            name="phone"
            variant="underlined"
            label="Phone"
            keyboardType="phone-pad"
            onFocusNextInput={focusNextInput}
            placeholder="Enter your phone number"
            clearErrors={clearErrors}
            control={control}
          />
          <InputController
            index={2}
            refs={refs}
            name="streetAddress"
            label="Street address"
            variant="underlined"
            onFocusNextInput={focusNextInput}
            placeholder="Enter your street address"
            clearErrors={clearErrors}
            control={control}
          />
          <InputController
            index={3}
            refs={refs}
            name="city"
            variant="underlined"
            label="City"
            onFocusNextInput={focusNextInput}
            placeholder="Enter your city"
            clearErrors={clearErrors}
            control={control}
          />
          <InputController
            index={4}
            refs={refs}
            name="state"
            variant="underlined"
            label="State"
            onFocusNextInput={focusNextInput}
            placeholder="Enter your state"
            clearErrors={clearErrors}
            control={control}
          />
          <InputController
            index={5}
            refs={refs}
            name="zipCode"
            label="Zipcode"
            keyboardType="number-pad"
            variant="underlined"
            onFocusNextInput={focusNextInput}
            placeholder="Enter your zipcode"
            clearErrors={clearErrors}
            control={control}
          />
        </View>
      </StickyFooter>
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  locationWrapper: { lineHeight: 24 },
  contentContainerStyle: { flexGrow: 1 },
  currentLocationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[5],
  },
  formWrapper: {
    paddingLeft: spacing[7],
    paddingRight: spacing['2.5'],
    paddingTop: spacing[9],
    paddingBottom: 50,
    gap: spacing[4],
  },
});
