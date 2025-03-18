import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

// Components
import { StickyFooterLayout } from '@/ui/layouts';
import { InputController, Text } from '@/ui/components';

// Icons
import { TargetLocationIcon } from '@/ui/icons';

// Hooks
import { AddressState } from '@/hooks';

// Schemas
import { addressSchema } from '@/schemas';

// Themes
import { colors, spacing } from '@/ui/themes';

interface FormAddressProps {
  form: AddressState;
  onSubmit: (data: AddressState) => void;
}

export const FormAddress = memo(({ form, onSubmit }: FormAddressProps) => {
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
    <StickyFooterLayout
      disabled={!isDirty}
      buttonText="Save"
      onPress={submitForm(onSubmit)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 110}
        style={styles.container}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
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
              name="username"
              variant="underlined"
              label="Name"
              placeholder="Enter your name"
              clearErrors={clearErrors}
              control={control}
            />
            <InputController
              name="phone"
              variant="underlined"
              label="Phone"
              placeholder="Enter your phone number"
              clearErrors={clearErrors}
              control={control}
            />
            <InputController
              name="streetAddress"
              label="Street address"
              variant="underlined"
              placeholder="Enter your street address"
              clearErrors={clearErrors}
              control={control}
            />
            <InputController
              name="city"
              variant="underlined"
              label="City"
              placeholder="Enter your city"
              clearErrors={clearErrors}
              control={control}
            />
            <InputController
              name="state"
              variant="underlined"
              label="State"
              placeholder="Enter your state"
              clearErrors={clearErrors}
              control={control}
            />
            <InputController
              name="zipCode"
              label="Zipcode"
              variant="underlined"
              placeholder="Enter your zipcode"
              clearErrors={clearErrors}
              control={control}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </StickyFooterLayout>
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
