import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      set({ ...INITIAL_AUTH_STATE });
    },
  }),
  shallow,
);

export default useAuthStore;
