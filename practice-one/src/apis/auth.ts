import { useMutation } from '@tanstack/react-query';

// Constants
import { API_ENDPOINT } from '@/constants';

// Services
import { httpClient } from '@/services';

// Interfaces
import { AuthPayload, UsersResponse } from '@/interfaces';

export const useAuthLogin = () =>
  useMutation<UsersResponse, string, AuthPayload>({
    mutationFn: async (payload) =>
      httpClient.post({ endpoint: API_ENDPOINT.SIGN_IN, payload }),
  });
