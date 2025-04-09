import { Alert, PermissionsAndroid, Platform } from 'react-native';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import {
  checkAndRequestNotificationPermission,
  requestCameraPermission,
  requestGalleryPermission,
} from '..';

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: jest.fn(),
}));

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

jest.mock('@notifee/react-native', () => ({
  getNotificationSettings: jest.fn(),
  requestPermission: jest.fn(),
  AuthorizationStatus: {
    AUTHORIZED: 1,
    DENIED: 2,
    NOT_DETERMINED: 0,
    PROVISIONAL: 3,
  },
}));

describe('Permissions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('requestCameraPermission', () => {
    it('Should return true when permission granted', async () => {
      jest.spyOn(PermissionsAndroid, 'request').mockResolvedValue('granted');

      const result = await requestCameraPermission();
      expect(result).toBe(true);
    });

    it('Should return false when permission denied', async () => {
      jest.spyOn(PermissionsAndroid, 'request').mockResolvedValueOnce('denied');

      const result = await requestCameraPermission();
      expect(result).toBe(false);
    });

    it('Should return true on iOS', async () => {
      const originalPlatform = Platform.OS;
      Platform.OS = 'ios';

      const result = await requestCameraPermission();
      expect(result).toBe(true);

      Platform.OS = originalPlatform; // restore
    });

    it('Should return false when request throws error', async () => {
      jest
        .spyOn(PermissionsAndroid, 'request')
        .mockRejectedValue(new Error('error'));

      const result = await requestCameraPermission();
      expect(result).toBe(false);
    });
  });

  describe('requestGalleryPermission', () => {
    it('Should return true when permission granted', async () => {
      jest.spyOn(PermissionsAndroid, 'requestMultiple').mockImplementation(
        async () =>
          ({
            'android.permission.READ_MEDIA_IMAGES': 'granted',
          } as any),
      );

      const result = await requestGalleryPermission();
      expect(result).toBe(true);
    });

    it('Should return false when permission denied', async () => {
      jest.spyOn(PermissionsAndroid, 'requestMultiple').mockImplementation(
        async () =>
          ({
            'android.permission.READ_MEDIA_IMAGES': 'denied',
          } as any),
      );

      const result = await requestGalleryPermission();
      expect(result).toBe(false);
    });

    it('Should return true on iOS', async () => {
      const originalPlatform = Platform.OS;
      Platform.OS = 'ios';

      const result = await requestGalleryPermission();
      expect(result).toBe(true);

      Platform.OS = originalPlatform;
    });

    it('Should return false when requestMultiple throws error', async () => {
      jest
        .spyOn(PermissionsAndroid, 'requestMultiple')
        .mockRejectedValue(new Error('error'));

      const result = await requestGalleryPermission();
      expect(result).toBe(false);
    });
  });

  describe('checkAndRequestNotificationPermission', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Should return true if permission is already authorized', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(result).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('Should show alert and return false if permission is denied', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.DENIED,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Notification permission denied',
        'Please enable notifications in the app settings to receive notifications.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Settings', onPress: expect.any(Function) },
        ],
        { cancelable: false },
      );
    });

    it('Should request permission if not determined and return true if authorized', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
      });
      (notifee.requestPermission as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(result).toBe(true);
      expect(notifee.requestPermission).toHaveBeenCalled();
    });

    it('Should request permission if not determined and return true if provisional', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
      });
      (notifee.requestPermission as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.PROVISIONAL,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(result).toBe(false);
      expect(notifee.requestPermission).toHaveBeenCalled();
    });

    it('Should request permission and return false if still unauthorized', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
      });
      (notifee.requestPermission as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.DENIED,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(result).toBe(false);
      expect(notifee.requestPermission).toHaveBeenCalled();
    });

    it('Should return false if requestPermission throws error', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
      });
      (notifee.requestPermission as jest.Mock).mockRejectedValue(
        new Error('Request error'),
      );

      const result = await checkAndRequestNotificationPermission();
      expect(result).toBe(false);
      expect(notifee.requestPermission).toHaveBeenCalled();
    });
  });
});
