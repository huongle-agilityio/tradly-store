import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { styles } from './styles';

// Components
import { StickyFooterLayout } from '@/ui/layouts';
import { InputController, Text } from '@/ui/components';

// Icons
import { TargetLocationIcon } from '@/ui/icons';

// Hooks
import { AddressState, useAddressForm } from '@/hooks';

// Stores
import { useToast } from '@/stores';

// Schemas
import { addressSchema } from '@/schemas';

// Themes
import { colors } from '@/ui/themes';

export const Address = () => {
  const [form, setForm] = useAddressForm((state) => [
    state.form,
    state.setForm,
  ]);
  const showToast = useToast((state) => state.showToast);

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

  const handleSubmit = (data: AddressState) => {
    setForm(data);
    showToast({
      description: 'Address saved successfully',
      variant: 'success',
    });
    router.back();
  };

  return (
    <StickyFooterLayout
      disabled={!isDirty}
      buttonText="Save"
      onPress={submitForm(handleSubmit)}
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
};
