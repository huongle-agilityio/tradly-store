import { requestCameraPermission, requestGalleryPermission } from '..';
import { PermissionsAndroid, Platform } from 'react-native';

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: jest.fn(),
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
});
