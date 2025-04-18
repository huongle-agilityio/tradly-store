import { act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIniStore } from '..';

// Constants
import { STORAGE_KEY } from '@/constants';

describe('useIniStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useIniStore.setState({ isFirstLogin: true });
  });

  it('Should return default value for isFirstLogin', () => {
    expect(useIniStore.getState().isFirstLogin).toBe(true);
  });

  it('Should set isFirstLogin to false', () => {
    const { setIsFirstLogin } = useIniStore.getState();

    act(() => {
      setIsFirstLogin(false);
    });

    expect(useIniStore.getState().isFirstLogin).toBe(false);
  });

  it('Should persist isFirstLogin to AsyncStorage', async () => {
    const { setIsFirstLogin } = useIniStore.getState();

    await act(async () => {
      setIsFirstLogin(false);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY.FIRST_LOGIN,
      expect.stringContaining('"isFirstLogin":false'),
    );
  });
});
