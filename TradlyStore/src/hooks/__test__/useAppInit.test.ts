import { DevSettings } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useAppInit, useToggleStorybook } from '../useAppInit';
import * as useHydrationModule from '../useHydration';

// Stores
import * as useAuthStoreModule from '@/stores/auth';
import * as useIniStoreModule from '@/stores/init';

// Interfaces
import { User } from '@/interfaces';

// Utils
import * as Utils from '@/utils';

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
}));

jest.mock('@/utils', () => ({
  clearImagePickerFiles: jest.fn(),
  createNotificationChannel: jest.fn(),
}));

jest.mock('../useHydration', () => ({
  useHydration: jest.fn(),
}));

const mockLog = jest.fn();
const mockRecordError = jest.fn();

jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    log: mockLog,
    recordError: mockRecordError,
  });
});

jest.mock('react-native/Libraries/Utilities/DevSettings', () => ({
  addMenuItem: jest.fn(),
}));

describe('useAppInit', () => {
  const mockSetAuthenticated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(useAuthStoreModule, 'useAuthStore')
      .mockImplementation((selector) =>
        selector({
          setAuthenticated: mockSetAuthenticated,
          setUser: jest.fn(),
          clearAuth: jest.fn(),
          isAuthenticated: false,
          user: {} as User,
        }),
      );
    jest
      .spyOn(useIniStoreModule, 'useIniStore')
      .mockImplementation((selector) =>
        selector({
          isFirstLogin: true,
          setIsFirstLogin: jest.fn(),
        }),
      );
  });

  it('Should setAuthenticated to true if token exists', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue({
      username: 'user',
      password: 'token123',
    });
    (useHydrationModule.useHydration as jest.Mock).mockReturnValue(true);

    await renderHook(() => useAppInit());

    await waitFor(() => {
      expect(mockSetAuthenticated).toHaveBeenCalledWith(true);
    });

    expect(Utils.createNotificationChannel).toHaveBeenCalled();
  });

  it('Should setAuthenticated to false if no token exists', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(false);
    (useHydrationModule.useHydration as jest.Mock).mockReturnValue(false);

    await renderHook(() => useAppInit());

    await waitFor(() => {
      expect(mockSetAuthenticated).toHaveBeenCalledWith(false);
    });
  });

  it('Should log and record error if something fails', async () => {
    const error = new Error('Test error');
    (Keychain.getGenericPassword as jest.Mock).mockRejectedValue(error);
    (useHydrationModule.useHydration as jest.Mock).mockReturnValue(true);

    await renderHook(() => useAppInit());

    expect(mockRecordError).toHaveBeenCalledWith(error);
  });
});

describe('useToggleStorybook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should toggle Storybook state', () => {
    let callbackFn: () => void = () => {};

    (DevSettings.addMenuItem as jest.Mock).mockImplementation(
      (_label, callback) => {
        callbackFn = callback;
      },
    );

    const { result } = renderHook(() => useToggleStorybook());

    expect(result.current).toBe(false);

    // Simulate clicking the dev menu item
    act(() => {
      callbackFn(); // toggle once
    });
    expect(result.current).toBe(true);

    act(() => {
      callbackFn(); // toggle again
    });
    expect(result.current).toBe(false);
  });
});
