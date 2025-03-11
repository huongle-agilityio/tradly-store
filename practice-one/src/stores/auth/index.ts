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
      setAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },

      setUser: (user: User) => {
        set({ user });
      },

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
