import { PermissionsAndroid, Platform } from 'react-native';

/**
 * Requests the permission to access the device's camera on Android.
 * On iOS devices, this function will return true.
 * @returns A boolean indicating whether the permission was granted or not.
 */
export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  }

  return true;
};

/**
 * Requests the permission to access the device's gallery on Android.
 * On iOS devices, this function will return true.
 * @returns A boolean indicating whether the permission was granted or not.
 */
export const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ]);

      const isStorageGranted =
        granted['android.permission.READ_MEDIA_IMAGES'] ===
        PermissionsAndroid.RESULTS.GRANTED;

      return isStorageGranted;
    } catch (err) {
      return false;
    }
  }

  return true;
};
