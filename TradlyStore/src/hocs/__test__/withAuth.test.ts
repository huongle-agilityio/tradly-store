import * as Keychain from 'react-native-keychain';

// HOCs
import { withAuth } from '../withAuth';

// Constants
import { ERROR_MESSAGES } from '@/constants';

jest.mock('react-native-keychain');

describe('withAuth', () => {
  it('Should throw an error if no token is found', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(null);

    await expect(withAuth(jest.fn())).rejects.toThrow(
      ERROR_MESSAGES.NO_TOKEN_FOUND,
    );
  });

  it('Should throw a generic error if Keychain fails to retrieve token', async () => {
    const keychainError = 'Some non-error string';
    (Keychain.getGenericPassword as jest.Mock).mockRejectedValue(keychainError);

    await expect(withAuth(jest.fn())).rejects.toThrow(
      ERROR_MESSAGES.FAILED_TOKEN,
    );
  });

  it('Should call the callback with token when token is found', async () => {
    const mockToken = { password: 'valid-jwt-token' };
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(mockToken);

    const mockCallback = jest.fn().mockResolvedValue('callback result');

    const result = await withAuth(mockCallback);

    expect(mockCallback).toHaveBeenCalledWith('valid-jwt-token');
    expect(result).toBe('callback result');
  });
});
