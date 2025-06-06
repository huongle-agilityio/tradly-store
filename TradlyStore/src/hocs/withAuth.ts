import * as Keychain from 'react-native-keychain';

// Constants
import { ERROR_MESSAGES, STORAGE_KEY } from '@/constants';

export const withAuth = async <T>(
  callback: (token: string) => Promise<T>,
): Promise<T> => {
  try {
    const token = await Keychain.getGenericPassword({
      service: STORAGE_KEY.TOKEN,
    });

    if (!token) {
      throw new Error(ERROR_MESSAGES.NO_TOKEN_FOUND);
    }

    const { password: jwt } = token;
    return callback(jwt);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : ERROR_MESSAGES.FAILED_TOKEN,
    );
  }
};
