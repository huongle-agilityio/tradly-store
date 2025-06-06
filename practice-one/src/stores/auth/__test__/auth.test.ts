import * as SecureStore from 'expo-secure-store';
import { act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useAuthStore from '..';

// Mocks
import { USER } from '@/mocks';

// Constants
import { STORAGE_KEY } from '@/constants';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock SecureStore
jest.mock('expo-secure-store', () => ({
  deleteItemAsync: jest.fn(),
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set authenticated state correctly', () => {
    const { setAuthenticated } = useAuthStore.getState();

    act(() => {
      setAuthenticated(true);
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('should set user data correctly', () => {
    const { setUser } = useAuthStore.getState();

    act(() => {
      setUser(USER);
    });

    expect(useAuthStore.getState().user).toEqual(USER);
  });

  it('should clear authentication data correctly', async () => {
    const { clearAuth } = useAuthStore.getState();

    await act(async () => {
      await clearAuth();
    });

    expect(AsyncStorage.clear).toHaveBeenCalled();
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(STORAGE_KEY.TOKEN);
  });
});
