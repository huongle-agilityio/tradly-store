import { useCallback } from 'react';

// Sections
import { Form } from './components/Form';

// Constants
import { SCREENS } from '@/constants';

// Hooks
import { AddressState, useAddressForm } from '@/hooks';

// Stores
import { useToast } from '@/stores';

// Interfaces
import { OrderScreenProps } from '@/interfaces';

export const Address = ({
  navigation,
}: OrderScreenProps<typeof SCREENS.ADDRESS>) => {
  const [form, setForm] = useAddressForm((state) => [
    state.form,
    state.setForm,
  ]);
  const showToast = useToast((state) => state.showToast);

  const onSubmit = useCallback(
    (data: AddressState) => {
      setForm(data);
      showToast({
        description: 'Address saved successfully',
        variant: 'success',
      });

      navigation.goBack();
    },
    [setForm, showToast, navigation],
  );

  return <Form onSubmit={onSubmit} form={form} />;
};
