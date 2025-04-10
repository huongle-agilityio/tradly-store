import '@testing-library/react-native';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn(),
  displayNotification: jest.fn(),
  onForegroundEvent: jest.fn(),
  AndroidImportance: { DEFAULT: 3 },
  EventType: { PRESS: 'PRESS' },
}));

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
      getInitialNotification: jest.fn(),
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
