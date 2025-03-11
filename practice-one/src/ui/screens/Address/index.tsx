import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { styles } from './styles';

// Components
import { StickyFooterLayout } from '@/ui/layouts';
import { InputController, Text } from '@/ui/components';

// Icons
import { TargetLocationIcon } from '@/ui/icons';

// Schemas
import { addressSchema } from '@/schema';

// Themes
import { colors } from '@/ui/themes';

interface FormData {
  name: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export const Address = () => {
  const {
    control,
    clearErrors,
    handleSubmit: submitForm,
  } = useForm<FormData>({
    resolver: valibotResolver(addressSchema),
    mode: 'onSubmit',
  });

  const handleSubmit = (data: FormData) => console.log(data);

  return (
    <StickyFooterLayout buttonText="Save" onPress={submitForm(handleSubmit)}>
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
              name="name"
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
