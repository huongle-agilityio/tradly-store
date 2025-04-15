import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { checkAndRequestNotificationPermission } from './permission';

// Constants
import {
  CHANNEL_NOTIFICATION,
  LINKING_URL,
  SCREENS,
  STORAGE_KEY,
} from '@/constants';

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
 * Handles foreground notifications.
 *
 * This function registers a listener for the `onMessage` event emitted by the
 * Firebase Cloud Messaging (FCM) module. When a notification is received while
 * the app is in the foreground, this function displays a notification using the
 * Notifee library.
 *
 * The notification is displayed with the title, body, and data properties of the
 * remote message. The notification is displayed in the default notification
 * channel.
 *
 * @returns {void} Nothing.
 */
export const handleForegroundNotifications = () => {
  messaging().onMessage(async (remoteMessage) => {
    if (remoteMessage.notification) {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId: CHANNEL_NOTIFICATION.DEFAULT.id,
          smallIcon: 'ic_notification',
          pressAction: {
            id: CHANNEL_NOTIFICATION.DEFAULT.id,
          },
          importance: AndroidImportance.HIGH,
          showTimestamp: true,
        },
        data: remoteMessage.data,
      });
    }
  });
};

/**
 * Handles notification open events.
 *
 * This function registers listeners for the following events:
 *
 * - When the app is in the background and the user taps on a notification
 * - When the app is killed and the user taps on a notification
 * - When the app is in the foreground and the user taps on a notification
 *
 * In all cases, it builds a deep link from the notification data and opens it
 * using the Linking module.
 */
export const handleNotificationOpen = () => {
  // Handle when the app is in the background
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage?.data) {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (url) {
        Linking.openURL(url);
      }
    }
  });

  // Handle when the app is killed
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage?.data) {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (url) {
          Linking.openURL(url);
        }
      }
    });

  // Handle when the app is in the foreground
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS && detail.notification) {
      const url = buildDeepLinkFromNotificationData(
        detail.notification.data ?? {},
      );
      if (url) {
        Linking.openURL(url);
      }
    }
  });
};

/**
 * Registers handlers for notification-related events.
 *
 * This function should be called in the app's entry point (e.g. App.tsx) to
 * register the necessary handlers for Firebase Cloud Messaging (FCM)
 * notifications.
 *
 * The following handlers are registered:
 *
 * - When the app is in the foreground and the user taps on a notification
 * - When the app is opened from the background (already running but not focused)
 * - When the app is opened from a quit state (completely closed)
 *
 * In all cases, it builds a deep link from the notification data and opens it
 * using the Linking module.
 */
export const registerNotificationHandlers = async () => {
  const isFirstLogin = await AsyncStorage.getItem(STORAGE_KEY.FIRST_LOGIN);

  if (isFirstLogin) {
    await notifee.requestPermission();
  } else {
    await checkAndRequestNotificationPermission();
  }

  createNotificationChannel();
  handleForegroundNotifications();
  handleNotificationOpen();
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
  console.log('= ', token);
  console.log('========================================');
};
