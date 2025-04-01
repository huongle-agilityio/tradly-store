import * as Keychain from 'react-native-keychain';

// Constants
import { STORAGE_KEY } from '@/constants';

// HOCs
import { withAuth } from '../withAuth';

jest.mock('react-native-keychain', () => ({
  getGenericPassword: jest.fn(),
}));

describe('withAuth utility function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call callback with the stored token', async () => {
    const mockToken = 'mock-jwt-token';
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue({
      password: mockToken,
    });

    const mockCallback = jest.fn().mockResolvedValue('success');

    const result = await withAuth(mockCallback);

    expect(Keychain.getGenericPassword).toHaveBeenCalledWith({
      service: STORAGE_KEY.TOKEN,
    });
    expect(mockCallback).toHaveBeenCalledWith(mockToken);
    expect(result).toBe('success');
  });

  it('Should return null if no token is stored', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(null);

    const mockCallback = jest.fn();

    const result = await withAuth(mockCallback);

    expect(Keychain.getGenericPassword).toHaveBeenCalledWith({
      service: STORAGE_KEY.TOKEN,
    });
    expect(mockCallback).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('Should return null if Keychain.getGenericPassword throws an error', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockRejectedValue(
      new Error('Keychain error'),
    );

    const mockCallback = jest.fn();

    const result = await withAuth(mockCallback);

    expect(Keychain.getGenericPassword).toHaveBeenCalledWith({
      service: STORAGE_KEY.TOKEN,
    });
    expect(mockCallback).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
