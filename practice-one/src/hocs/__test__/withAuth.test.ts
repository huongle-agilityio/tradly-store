import * as SecureStore from 'expo-secure-store';
import { withAuth } from '../withAuth';

jest.mock('expo-secure-store');

describe('withAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the callback with the retrieved token', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mock-token');

    const mockCallback = jest.fn().mockResolvedValue('Success');
    const result = await withAuth(mockCallback);

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(mockCallback).toHaveBeenCalledWith('mock-token');
    expect(result).toBe('Success');
  });

  it('should call the callback with an empty string if no token is found', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

    const mockCallback = jest.fn().mockResolvedValue('No Token');
    const result = await withAuth(mockCallback);

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(mockCallback).toHaveBeenCalledWith('');
    expect(result).toBe('No Token');
  });

  it('should throw an error if the callback fails', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mock-token');

    const mockCallback = jest.fn().mockRejectedValue(new Error('API error'));

    await expect(withAuth(mockCallback)).rejects.toThrow('API error');

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(mockCallback).toHaveBeenCalledWith('mock-token');
  });
});
