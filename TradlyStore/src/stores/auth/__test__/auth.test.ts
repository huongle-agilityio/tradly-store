import * as Keychain from 'react-native-keychain';
import { act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '..';

// Mocks
import { USER } from '@/mocks';

// Constants
import { STORAGE_KEY } from '@/constants';

describe('useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should set authenticated state correctly', () => {
    const { setAuthenticated } = useAuthStore.getState();

    act(() => {
      setAuthenticated(true);
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('Should set user data correctly', () => {
    const { setUser } = useAuthStore.getState();

    act(() => {
      setUser(USER);
    });

    expect(useAuthStore.getState().user).toEqual(USER);
  });

  it('Should clear authentication data correctly', async () => {
    const { clearAuth } = useAuthStore.getState();

    await act(async () => {
      await clearAuth();
    });

    expect(AsyncStorage.removeItem).toHaveBeenCalled();
    expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
      service: STORAGE_KEY.TOKEN,
    });
  });
});
