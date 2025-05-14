/* eslint-disable no-undef */
import '@testing-library/react-native';

jest.mock('@gorhom/portal', () => {
  return {
    PortalProvider: ({ children }) => <>{children}</>,
    PortalHost: ({ children }) => <>{children}</>,
    Portal: ({ children }) => <>{children}</>,
  };
});

// Mock @gorhom/bottom-sheet
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View, FlatList } = require('react-native');

  const BottomSheet = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      snapToIndex: jest.fn(),
      close: jest.fn(),
    }));

    return (
      <View testID="bottom-sheet" {...props}>
        {props.children}
      </View>
    );
  });

  const BottomSheetFlatList = ({ children, ...props }) => {
    return (
      <FlatList testID="bottom-sheet-flatlist" {...props}>
        {children}
      </FlatList>
    );
  };

  return {
    __esModule: true,
    default: BottomSheet,
    BottomSheet,
    BottomSheetFlatList,
  };
});

// Mock Notifee
jest.mock('@notifee/react-native', () => ({
  requestPermission: jest.fn(),
  createChannel: jest.fn(),
  displayNotification: jest.fn(),
  onForegroundEvent: jest.fn(),
  getNotificationSettings: jest.fn(() =>
    Promise.resolve({
      authorizationStatus: 1,
    }),
  ),
  AuthorizationStatus: {
    AUTHORIZED: 1,
    PROVISIONAL: 2,
    DENIED: 3,
    NOT_DETERMINED: 0,
  },
  AndroidImportance: {
    HIGH: 'high',
  },
  EventType: {
    DISMISSED: 0,
    PRESS: 1,
  },
}));

// Mock Firebase
jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    requestPermission: jest.fn(),
    getToken: jest.fn(),
    onMessage: jest.fn(),
    setBackgroundMessageHandler: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(),
  });
});

jest.mock('@react-native-firebase/app', () => {
  return {
    firebase: {
      app: jest.fn(() => ({
        messaging: jest.fn(),
      })),
    },
  };
});

jest.mock('@react-native-firebase/messaging', () => {
  return Object.assign(
    () => ({
      requestPermission: jest.fn(),
      getToken: jest.fn(),
      onMessage: jest.fn(),
      setBackgroundMessageHandler: jest.fn(),
      onNotificationOpenedApp: jest.fn(),
      getInitialNotification: jest.fn(() => Promise.resolve(undefined)),
    }),
    {
      AuthorizationStatus: {
        AUTHORIZED: 1,
        DENIED: 0,
        NOT_DETERMINED: -1,
      },
    },
  );
});

// Mock Firebase Performance
jest.mock('@react-native-firebase/perf', () => {
  const startTraceMock = jest.fn(async () => ({
    stop: jest.fn(),
  }));

  const perfMock = jest.fn(() => ({
    startTrace: startTraceMock,
    newHttpMetric: jest.fn(() => ({
      start: jest.fn(),
      stop: jest.fn(),
      setHttpResponseCode: jest.fn(),
      setRequestPayloadSize: jest.fn(),
      setResponseContentType: jest.fn(),
      setResponsePayloadSize: jest.fn(),
      putAttribute: jest.fn(),
    })),
  }));

  return {
    __esModule: true,
    default: perfMock,
    FirebasePerformanceTypes: {},
  };
});

// Mock Keychain
jest.mock('react-native-keychain', () => ({
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

// Mock Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({ navigate: jest.fn() }),
    useTheme: () => ({
      colors: {
        transparent: '',
        primary: '#000',
        background: '',
        backgroundSecondary: '',
        backgroundOpacity: '',
        secondary: '',
        tertiary: '',
        light: '#fff',
        placeholder: '',
        error: '',
        success: '',
        opacity: '',
        link: '',
        dotNotification: '',
        border: '',
        text: {
          default: '',
          light: '',
          primary: '',
          secondary: '',
          tertiary: '',
          quaternary: '',
          placeholder: '',
          fade: '',
          link: '',
          error: '',
          success: '',
        },
        skeleton: {
          backgroundPrimary: '',
          backgroundSecondary: '',
        },
        button: {
          backgroundPrimary: '',
          backgroundSecondary: '',
          success: '',
          error: '',
          textPrimary: '',
          textSecondary: '',
          textDark: '',
        },
        toast: {
          default: '',
          success: '',
          error: '',
        },
        input: {
          backgroundPrimary: '',
          borderPrimary: '',
          borderSecondary: '',
          textPrimary: '',
          textSecondary: '',
          textTertiary: '',
          textQuaternary: '',
          textPlaceholder: '',
        },
        select: {
          backgroundPrimary: '',
          badge: '',
          textPrimary: '',
        },
        productCard: {
          background: '',
          border: '',
          textSecondary: '',
          textPrimary: '',
          textTertiary: '',
        },
        storeCard: {
          background: '',
          text: '',
        },
        categoryCard: {
          background: '',
          border: '',
          text: '',
        },
        tabs: {
          tabBackground: '',
          tabActiveIColor: '',
          tabBarInactiveTintColor: '',
        },
        cartItem: {
          background: '',
          textPrimary: '',
          textSecondary: '',
        },
        toggleTheme: {
          dotBackground: '',
          background: '',
          backgroundActive: '',
        },
        bottomSheet: {
          background: '',
        },
      },
    }),
    NavigationContainer: ({ children }) => <>{children}</>,
  };
});
