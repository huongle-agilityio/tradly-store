import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';

// Constants
import { API_ENDPOINT, STORAGE_KEY } from '@/constants';

// Services
import { httpClient } from '@/services';

// Interfaces
import { AuthPayload, AuthResponse } from '@/interfaces';

export const useAuthLogin = () =>
  useMutation<AuthResponse, string, AuthPayload>({
    mutationFn: async (payload) =>
      httpClient.post({ endpoint: API_ENDPOINT.SIGN_IN, payload }),
    onSuccess: async (data) => {
      const user = JSON.stringify(data.user);
      await AsyncStorage.setItem(STORAGE_KEY.USER, user);
      await AsyncStorage.setItem(STORAGE_KEY.TOKEN, data.jwt);
    },
  });
