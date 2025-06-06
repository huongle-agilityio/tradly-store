import { PermissionsAndroid, Platform } from 'react-native';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkAndRequestNotificationPermission, requestPermission } from '..';

// Interfaces
import { PermissionType } from '@/interfaces';

jest.mock(
  'react-native/Libraries/PermissionsAndroid/PermissionsAndroid',
  () => ({
    check: jest.fn(),
    request: jest.fn(),
    PERMISSIONS: {
      CAMERA: 'android.permission.camera',
      READ_MEDIA_IMAGES: 'android.permission.READ_MEDIA_IMAGES',
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
      NEVER_ASK_AGAIN: 'never_ask_again',
    },
  }),
);

jest.mock('@notifee/react-native', () => ({
  getNotificationSettings: jest.fn(),
  requestPermission: jest.fn(),
  createChannel: jest.fn(),
  onForegroundEvent: jest.fn(),
  AuthorizationStatus: {
    AUTHORIZED: 1,
    DENIED: 0,
    NOT_DETERMINED: -1,
    PROVISIONAL: 3,
  },
  AndroidImportance: {
    HIGH: 4,
  },
}));

describe('Permissions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('requestPermission', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Should return true if permission already granted', async () => {
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(true);

      const result = await requestPermission(PermissionType.camera);

      expect(result).toBe(true);
      expect(PermissionsAndroid.check).toHaveBeenCalledWith(
        'android.permission.camera',
      );
    });

    it('Should return true if permission granted after request', async () => {
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(false);
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue('granted');

      const result = await requestPermission(PermissionType.camera);

      expect(result).toBe(true);
      expect(PermissionsAndroid.request).toHaveBeenCalledWith(
        'android.permission.camera',
      );
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('camera');
    });

    it('Should return false and store denied if permission denied after request', async () => {
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(false);
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue('denied');

      const result = await requestPermission(PermissionType.camera);

      expect(result).toBe(false);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('camera', 'true');
    });

    it('Should return never_ask_again if permission never ask again and deniedStatus !== "true"', async () => {
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(false);
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        'never_ask_again',
      );
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await requestPermission(PermissionType.camera);

      expect(result).toBe('never_ask_again');
    });

    it('Should not show never_ask_again if permission never ask again but deniedStatus === "true"', async () => {
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(false);
      (PermissionsAndroid.request as jest.Mock).mockResolvedValue(
        'never_ask_again',
      );
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('true');

      const result = await requestPermission(PermissionType.camera);

      expect(result).toBeFalsy();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('camera', 'false');
    });

    it('Should return false if request permission throws error', async () => {
      (PermissionsAndroid.check as jest.Mock).mockResolvedValue(false);
      (PermissionsAndroid.request as jest.Mock).mockRejectedValue(
        new Error('request failed'),
      );

      const result = await requestPermission(PermissionType.camera);

      expect(result).toBe(false);
    });

    it('Should return true on iOS (skip android permission flow)', async () => {
      (Platform.OS as any) = 'ios';

      const result = await requestPermission(PermissionType.camera);

      expect(result).toBe(true);
    });
  });

  describe('checkAndRequestNotificationPermission', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should return true if notifications are already authorized', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(result).toBe(true);
      expect(notifee.getNotificationSettings).toHaveBeenCalled();
    });

    it('Should return true if notifications are provisionally authorized', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.PROVISIONAL,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(result).toBe(false);
      expect(notifee.getNotificationSettings).toHaveBeenCalled();
    });

    it('Should show alert and return false if notifications are denied', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.DENIED,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(result).toBe(AuthorizationStatus.DENIED);
    });

    it('Should request permission if not determined and succeed', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
      });

      (notifee.requestPermission as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(notifee.requestPermission).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('Should request permission if not determined and fail', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
      });

      (notifee.requestPermission as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.DENIED,
      });

      const result = await checkAndRequestNotificationPermission();

      expect(notifee.requestPermission).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('Should handle error when requesting permission', async () => {
      (notifee.getNotificationSettings as jest.Mock).mockResolvedValue({
        authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
      });

      (notifee.requestPermission as jest.Mock).mockRejectedValue(
        new Error('Some error'),
      );

      const result = await checkAndRequestNotificationPermission();

      expect(notifee.requestPermission).toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
