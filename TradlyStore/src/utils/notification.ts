import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

// Constants
import { CHANNEL_NOTIFICATION, LINKING_URL, SCREENS } from '@/constants';

/**
 * Builds a deep link URL from the provided notification data.
 *
 * This function extracts the `navigationId` and `postId` from the notification
 * data and constructs a URL based on these values. If the `navigationId` is
 * "browse", it returns the browse link. If a valid `postId` is provided, it
 * returns the product detail link for that post. Otherwise, it defaults to
 * the home link.
 *
 * @param data - An object containing the notification data, which may include
 * `navigationId` and `postId` properties.
 *
 * @returns A string representing the deep link URL based on the notification
 * data, or null if a URL cannot be constructed.
 */
export const buildDeepLinkFromNotificationData = (
  data: { [key: string]: string | number | object } | undefined,
): string | null => {
  const navigationId = data?.navigationId || SCREENS.HOME;

  if (navigationId === SCREENS.BROWSE) {
    return LINKING_URL.BROWSE;
  }

  const postId = data?.postId;
  if (typeof postId === 'string') {
    return LINKING_URL.PRODUCT_DETAIL(postId);
  }

  return LINKING_URL.HOME;
};

/**
 * Creates a notification channel for the app.
 *
 * This function creates a notification channel with the specified id, name, and importance.
 * If the channel already exists, this function does nothing.
 *
 * @returns {Promise<void>} A promise that resolves when the channel has been created.
 */
export const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: CHANNEL_NOTIFICATION.DEFAULT.id,
    name: CHANNEL_NOTIFICATION.DEFAULT.name,
    importance: AndroidImportance.HIGH,
  });
};

/**
 * Retrieves the device token for the app.
 *
 * This function returns a promise that resolves with the device token as a
 * string. It is used to obtain the device token for the app, which is required
 * for Firebase Cloud Messaging (FCM) to deliver notifications.
 *
 * The device token is logged to the console for convenience.
 *
 * @returns {Promise<string>} - A promise that resolves with the device token.
 */
export const handleGetDeviceToken = async () => {
  const token = await messaging().getToken();

  console.log('==============Device Token==============');
  console.log(token);
  console.log('========================================');
};
