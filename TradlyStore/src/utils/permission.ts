import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthorizationStatus } from '@react-native-firebase/messaging';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { registerNotificationHandlers } from './notification';

// Constants
import { PERMISSION_MESSAGES, PERMISSION_TYPES } from '@/constants';

/**
 * Requests a permission from the user and handles the response accordingly.
 *
 * If the permission is granted, it returns true.
 * If the permission is denied, it returns false.
 * If the permission is denied permanently ("Don't ask again"), it displays an alert
 * asking the user to enable the permission in the app settings.
 *
 * @param permissionType - The permission type to request. Must be one of the keys
 *   of `PERMISSION_TYPES`.
 * @returns A boolean indicating whether the permission was granted or not.
 */
export const requestPermission = async (
  permissionType: keyof typeof PERMISSION_TYPES,
) => {
  const permission = PERMISSION_TYPES[permissionType];
  const messages = PERMISSION_MESSAGES[permissionType];

  if (Platform.OS === 'android') {
    const alreadyGranted = await PermissionsAndroid.check(permission);

    if (alreadyGranted) {
      return true;
    }

    const deniedStatus = await AsyncStorage.getItem(`${permissionType}_denied`);

    try {
      const granted = await PermissionsAndroid.request(permission);

      switch (granted) {
        case PermissionsAndroid.RESULTS.GRANTED:
          await AsyncStorage.removeItem(`${permissionType}_denied`);
          // User granted the permission
          return true;

        case PermissionsAndroid.RESULTS.DENIED:
          // User denied the permission (but can be asked again later)
          await AsyncStorage.setItem(`${permissionType}_denied`, 'true');
          return false;

        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
          // User denied permanently ("Don't ask again")
          if (deniedStatus === 'true') {
            return await AsyncStorage.setItem(
              `${permissionType}_denied`,
              'false',
            );
          }

          Alert.alert(
            `${messages.title} blocked`,
            messages.blocked,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ],
            { cancelable: false },
          );
          return false;

        default:
          return false;
      }
    } catch (error) {
      return false;
    }
  }

  // iOS devices: permission is handled by the system automatically
  return true;
};

/**
 * Checks and requests notification permission if not already determined.
 *
 * This function checks the current notification authorization status.
 * Depending on the status, it either returns a boolean indicating
 * whether notifications are authorized, requests permission if not determined, or
 * alerts the user if notifications are denied.
 *
 * - If permission is authorized or provisional, returns true.
 * - If permission is denied, shows an alert suggesting the user to enable it in settings.
 * - If permission is not determined, requests permission and returns true if granted.
 * - If permission status is unknown, alerts the user and suggests checking settings.
 *
 * @returns {Promise<boolean>} A promise that resolves to true if notifications are authorized (or provisionally authorized), otherwise false.
 */
export const checkAndRequestNotificationPermission = async () => {
  const settings = await notifee.getNotificationSettings();

  switch (settings.authorizationStatus) {
    case AuthorizationStatus.AUTHORIZED:
      //  User has fully authorized notifications
      await registerNotificationHandlers();
      return true;

    case AuthorizationStatus.PROVISIONAL:
      // Provisional authorization: Notifications are allowed quietly (iOS only)
      // You may treat this as "granted" depending on your app requirement
      return true;

    case AuthorizationStatus.DENIED:
      //  User has denied notifications - suggest going to settings
      Alert.alert(
        'Notifications disabled',
        'To receive important updates, please enable notifications in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
        { cancelable: true },
      );
      return false;

    case AuthorizationStatus.NOT_DETERMINED:
      // Permission has not been requested yet - request it now
      try {
        const newStatus = await notifee.requestPermission();

        if (
          newStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
          newStatus.authorizationStatus === AuthorizationStatus.PROVISIONAL
        ) {
          //  Successfully granted after requesting
          return true;
        }
      } catch (error) {
        console.error('Failed to request notification permission:', error);
      }

      // Still not granted after requesting
      return false;

    default:
      return false;
  }
};
