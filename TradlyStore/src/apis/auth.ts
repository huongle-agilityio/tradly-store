import { useMutation } from '@tanstack/react-query';
import * as Keychain from 'react-native-keychain';

// Constants
import { API_ENDPOINT, STORAGE_KEY } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

// Services
import { httpClient } from '@/services';

// Interfaces
import { AuthPayload, AuthResponse } from '@/interfaces';

// Utils
import { checkAndRequestNotificationPermission } from '@/utils';

/**
 * Mutation hook to log in a user. The mutation function makes a
 * POST request to the `signin` endpoint with the provided payload. On success,
 * it stores the user's JWT token and the user object in AsyncStorage, using the
 * `STORAGE_KEY.TOKEN` and `STORAGE_KEY.USER` keys respectively.
 *
 * @returns A React Query mutation function that can be used to log in a user.
 */
export const useAuthLogin = () => {
  const [setUser, setIsAuthenticated] = useAuthStore((state) => [
    state.setUser,
    state.setAuthenticated,
  ]);

  return useMutation<AuthResponse, string, AuthPayload>({
    mutationFn: async (payload) =>
      httpClient.post({ endpoint: API_ENDPOINT.SIGN_IN, payload }),
    onSuccess: async ({ jwt, user }) => {
      await Keychain.setGenericPassword(STORAGE_KEY.TOKEN, jwt, {
        service: STORAGE_KEY.TOKEN,
      });
      await Keychain.setGenericPassword(
        STORAGE_KEY.FIRST_LOGIN,
        STORAGE_KEY.FIRST_LOGIN,
        {
          service: STORAGE_KEY.FIRST_LOGIN,
        },
      );

      setUser(user);
      setIsAuthenticated(true);
      await checkAndRequestNotificationPermission();
    },
  });
};
