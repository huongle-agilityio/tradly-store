import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Components
import { StickyFooterLayout } from '@/ui/layouts';
import { InputController, Text } from '@/ui/components';

// Icons
import { TargetLocationIcon } from '@/ui/icons';

// Hooks
import { AddressState, useFocusInput } from '@/hooks';

// Schemas
import { addressSchema } from '@/schemas';

// Themes
import { colors, spacing } from '@/ui/themes';

interface FormAddressProps {
  form: AddressState;
  onSubmit: (data: AddressState) => void;
}

export const FormAddress = memo(({ form, onSubmit }: FormAddressProps) => {
  const { focusNextInput, refs } = useFocusInput(6);

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
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StickyFooterLayout
        disabled={!isDirty}
        buttonText="Save"
        onPress={submitForm(onSubmit)}
      >
        <View style={styles.currentLocationWrapper}>
          <TargetLocationIcon size={24} color={colors.link} />
          <Text
            fontWeight="normal"
            color="link"
            fontSize="md"
            textStyle={{ lineHeight: 24 }}
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
      </StickyFooterLayout>
    </KeyboardAwareScrollView>
  );
});

FormAddress.displayName = 'FormAddress';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light },
  currentLocationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[5],
    backgroundColor: colors.light,
    elevation: spacing['2.5'],
  },
  formWrapper: {
    paddingLeft: spacing[7],
    paddingRight: spacing['2.5'],
    paddingTop: spacing[9],
    paddingBottom: 50,
    gap: spacing[4],
  },
});
