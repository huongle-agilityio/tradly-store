import '@testing-library/react-native';

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
        DENIED: 2,
        NOT_DETERMINED: 0,
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

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
