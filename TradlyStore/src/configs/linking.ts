import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { LinkingOptions } from '@react-navigation/native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

// Constants
import { CHANNEL_NOTIFICATION, LINKING_URL, SCREENS } from '@/constants';

// Interfaces
import { AppParamList } from '@/interfaces';

// Utils
import { buildDeepLinkFromNotificationData } from '@/utils';

const subscribe = (listener: (url: string) => void) => {
  const onReceiveURL = ({ url }: { url: string }) => listener(url);

  // Listen to incoming links from deep linking
  const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

  // onNotificationOpenedApp: When the application is running, but in the background.
  const unsubscribeBackground = messaging().onNotificationOpenedApp(
    (message) => {
      const url = buildDeepLinkFromNotificationData(message.data);

      if (typeof url === 'string') {
        listener(url);
      }
    },
  );

  // onMessage: When the application is in the foreground.
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

  // Listen for notification click event (foreground)
  const unsubscribeForeground = notifee.onForegroundEvent(
    ({ type, detail: { notification } }) => {
      if (type === EventType.PRESS) {
        const url = buildDeepLinkFromNotificationData(notification?.data);

        if (typeof url === 'string') {
          listener(url);
        }
      }
    },
  );

  return () => {
    linkingSubscription.remove();
    unsubscribeBackground();
    unsubscribeForeground();
  };
};

const getInitialURL = async () => {
  // Check if app was opened from a deep link
  const url = await Linking.getInitialURL();

  if (url) {
    return url;
  }

  // getInitialNotification: When the application is opened from a quit state
  const message = await messaging().getInitialNotification();

  if (message) {
    const deepLink = buildDeepLinkFromNotificationData(message.data);

    if (deepLink) {
      return deepLink;
    }
  }
};

export const linking: LinkingOptions<AppParamList> = {
  prefixes: [LINKING_URL.BASE, LINKING_URL.BASE_HTTP, LINKING_URL.BASE_HTTPS],
  config: {
    screens: {
      [SCREENS.TABS]: {
        screens: {
          [SCREENS.HOME]: SCREENS.HOME,
          [SCREENS.BROWSE]: SCREENS.BROWSE,
        },
      },
      [SCREENS.PRODUCT]: {
        screens: {
          [SCREENS.PRODUCT_DETAIL]: `${SCREENS.PRODUCT_DETAIL}/:id`,
        },
      },
    },
  },
  subscribe,
  getInitialURL,
};
