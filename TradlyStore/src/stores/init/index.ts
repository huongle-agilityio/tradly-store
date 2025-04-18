import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { STORAGE_KEY } from '@/constants';

// Models
import { InitState, InitStore } from './type';

const INITIAL_STATE: InitState = {
  isFirstLogin: true,
};

export const useIniStore = createWithEqualityFn<InitStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      /**
       * Sets the authentication state of the first store.
       *
       * @param {string} isFirstLogin - The authentication state as a string.
       */

      setIsFirstLogin: (isFirstLogin: boolean) => {
        set({ isFirstLogin });
      },
    }),
    {
      name: STORAGE_KEY.FIRST_LOGIN,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isFirstLogin: state.isFirstLogin,
      }),
    },
  ),
  shallow,
);
