import {useEffect} from 'react';
import {Linking, PermissionsAndroid, ActivityIndicator} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  LinkingOptions,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import {HomeScreen, Post, Details} from '@/screens';

type MoreStackParamList = {
  Feed?: undefined;
  Message?: {user: string};
};

export type RootStackParamList = {
  Home: undefined;
  Post: undefined;
  Details: NavigatorScreenParams<MoreStackParamList>;
};

const NAVIGATION_IDS = ['home', 'post', 'details'];

const buildDeepLinkFromNotificationData = (
  data: {[key: string]: string | object} | undefined,
): string | null => {
  console.log('data', data);

  const navigationId = data?.navigationId || 'home';
  if (
    typeof navigationId !== 'string' ||
    !NAVIGATION_IDS.includes(navigationId)
  ) {
    return null;
  }

  if (navigationId === 'home') {
    return 'tradly://home';
  }

  if (navigationId === 'details') {
    return 'tradly://details';
  }

  const postId = data?.postId;
  if (typeof postId === 'string') {
    return `tradly://post/${postId}`;
  }

  return 'tradly://home';
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['tradly://', 'http://www.tradly.com', 'https://www.tradly.com'],
  config: {
    screens: {
      Home: 'home',
      Post: 'post/:id',
      Details: 'details',
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
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    const foregroundMessageHandler = messaging().onMessage(
      async remoteMessage => {
        console.log('remoteMessage', remoteMessage);
      },
    );

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('remoteMessage - background', remoteMessage);
    });

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
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

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      await messaging().requestPermission();
    };

    requestUserPermission();
  }, []);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);
  const showStorybook = false;

  if (showStorybook) {
    const StorybookUI = require('./.storybook').default;

    return <StorybookUI />;
  }

  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator animating />}>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{animation: 'fade'}}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Post" component={Post} />
        <RootStack.Screen name="Details" component={Details} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
