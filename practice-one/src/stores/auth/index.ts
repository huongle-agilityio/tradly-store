import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

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
       * Clears all user data from local storage and SecureStore.
       * Sets the authentication state to false and resets the user state
       * to its initial state.
       */
      clearAuth: async () => {
        await AsyncStorage.clear();
        await SecureStore.deleteItemAsync(STORAGE_KEY.TOKEN);
        set({ ...INITIAL_AUTH_STATE });
      },
    }),
    {
      name: STORAGE_KEY.USER,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
  shallow,
);

export default useAuthStore;
