import { shallow } from 'zustand/shallow';
import * as Keychain from 'react-native-keychain';
import { createWithEqualityFn } from 'zustand/traditional';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { STORAGE_KEY } from '@/constants';

// Interfaces
import { User } from '@/interfaces';

// Models
import { AuthState, AuthStore } from './type';

export const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  user: {
    id: '',
    email: '',
    name: '',
    avatar: '',
    username: '',
    phone: '',
  },
};

export const useAuthStore = createWithEqualityFn<AuthStore>()(
  persist(
    (set) => ({
      ...INITIAL_AUTH_STATE,
      /**
       * Sets the authentication state to the given boolean value.
       * @param {boolean} isAuthenticated The authentication state.
       */
      setAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },

      /**
       * Updates the user state with the provided user object.
       * @param {User} user The user object containing user details.
       */
      setUser: (user: User) => {
        set({ user });
      },

      /**
       * Clears the authentication state and user data from storage.
       * This function is used when the user logs out of the application.
       */
      clearAuth: async () => {
        await AsyncStorage.removeItem(STORAGE_KEY.USER);
        await Keychain.resetGenericPassword({ service: STORAGE_KEY.TOKEN });
        set({ ...INITIAL_AUTH_STATE });
      },
    }),
    {
      name: STORAGE_KEY.USER,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
  shallow,
);
