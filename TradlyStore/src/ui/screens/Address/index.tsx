import { useNavigation } from '@react-navigation/native';

// Sections
import { FormAddress } from '@/ui/sections';

// Constants
import { SCREENS } from '@/constants';

// Hooks
import { AddressState, useAddressForm } from '@/hooks';

// Stores
import { useToast } from '@/stores';

// Interfaces
import { PrivateScreenProps } from '@/interfaces';

export const Address = () => {
  const { navigation } =
    useNavigation<PrivateScreenProps<typeof SCREENS.ADDRESS>>();
  const [form, setForm] = useAddressForm((state) => [
    state.form,
    state.setForm,
  ]);
  const showToast = useToast((state) => state.showToast);

  const onSubmit = (data: AddressState) => {
    setForm(data);
    showToast({
      description: 'Address saved successfully',
      variant: 'success',
    });
    navigation.goBack();
  };

  return <FormAddress onSubmit={onSubmit} form={form} />;
};
