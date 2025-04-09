import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { AuthorizationStatus } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

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

/**
 * Checks the current notification permission and requests permission if
 * it has not been determined yet. If the permission is denied, it will
 * show an alert to the user to enable notifications in the app settings.
 * @returns A boolean indicating whether the permission was granted or not.
 */
export const checkAndRequestNotificationPermission = async () => {
  const settings = await notifee.getNotificationSettings();

  // If the permission is already granted, return true
  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    return true;
  }

  // If the permission is denied, show an alert
  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    Alert.alert(
      'Notification permission denied',
      'Please enable notifications in the app settings to receive notifications.',

      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Go to Settings', onPress: () => Linking.openSettings() },
      ],
      { cancelable: false },
    );
    return false;
  }

  // If the permission has not been determined yet, request permission
  if (settings.authorizationStatus === AuthorizationStatus.NOT_DETERMINED) {
    try {
      const newStatus = await notifee.requestPermission();
      if (
        newStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
        newStatus.authorizationStatus === AuthorizationStatus.PROVISIONAL
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }
};
