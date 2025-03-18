import { router } from 'expo-router';

// Sections
import { FormAddress } from '@/ui/sections';

// Hooks
import { AddressState, useAddressForm } from '@/hooks';

// Stores
import { useToast } from '@/stores';

export const Address = () => {
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
    router.back();
  };

  return <FormAddress onSubmit={onSubmit} form={form} />;
};
