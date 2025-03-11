import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { STORAGE_KEY } from '@/constants';

export type AddressState = {
  username: string;
  streetAddress: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
};

const INIT_FORM = {
  username: '',
  streetAddress: '',
  phone: '',
  city: '',
  state: '',
  zipCode: '',
};

export type AddressFormState = {
  form: AddressState;
  clearForm: () => void;
  setForm: (form: AddressState) => void;
};

export const useAddressForm = createWithEqualityFn<AddressFormState>()(
  persist(
    (set) => ({
      form: INIT_FORM,
      setForm: (form: AddressState) =>
        set((prev: AddressFormState) => ({ form: { ...prev.form, ...form } })),
      clearForm: () => set({ form: INIT_FORM }),
    }),
    {
      name: STORAGE_KEY.ADDRESS,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
  shallow,
);
