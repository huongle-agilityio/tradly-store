import * as SecureStore from 'expo-secure-store';

// Constants
import { STORAGE_KEY } from '@/constants';

export const withAuth = async <T>(
  callback: (token: string) => Promise<T>,
): Promise<T> => {
  const token = (await SecureStore.getItemAsync(STORAGE_KEY.TOKEN)) || '';
  return callback(token);
};
