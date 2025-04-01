import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { LinkingOptions } from '@react-navigation/native';

// Constants
import { LINKING_URL, SCREENS } from '@/constants';

// Interfaces
import { AppParamList } from '@/interfaces';

const buildDeepLinkFromNotificationData = (
  data: { [key: string]: string | object } | undefined,
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

export const linking: LinkingOptions<AppParamList> = {
  prefixes: [LINKING_URL.BASE, LINKING_URL.BASE_HTTP, LINKING_URL.BASE_HTTPS],
  config: {
    screens: {
      [SCREENS.TABS]: {
        screens: {
          [SCREENS.HOME]: SCREENS.HOME,
        },
      },
      [SCREENS.PRIVATE]: {
        screens: {
          [SCREENS.PRODUCT_STACK]: {
            screens: {
              [SCREENS.PRODUCT_DETAIL]: `${SCREENS.PRODUCT_DETAIL}/:id`,
            },
          },
        },
      },
    },
  },
  async getInitialURL() {
    // getInitialURL: When the application is opened from a quit state.
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    // getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);

    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    const foregroundMessageHandler = messaging().onMessage(
      async (remoteMessage) => {
        console.log('remoteMessage', remoteMessage);
      },
    );

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('remoteMessage - background', remoteMessage);
    });

    // onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
      foregroundMessageHandler();
    };
  },
};
