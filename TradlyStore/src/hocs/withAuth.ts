import * as Keychain from 'react-native-keychain';

// Constants
import { STORAGE_KEY } from '@/constants';

export const withAuth = async <T>(
  callback: (token: string) => Promise<T>,
): Promise<T> => {
  try {
    const token = await Keychain.getGenericPassword({
      service: STORAGE_KEY.TOKEN,
    });

    if (token) {
      const { password: jwt } = token;
      return callback(jwt);
    }

    return callback('');
  } catch (error) {
    return callback('');
  }
};
