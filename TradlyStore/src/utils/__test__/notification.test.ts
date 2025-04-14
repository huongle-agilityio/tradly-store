import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

import {
  buildDeepLinkFromNotificationData,
  createNotificationChannel,
  handleForegroundNotifications,
  handleGetDeviceToken,
  handleNotificationOpen,
  registerNotificationHandlers,
} from '../notification';

// Constants
import { LINKING_URL } from '@/constants';

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    requestPermission: jest.fn(),
    createChannel: jest.fn(),
    displayNotification: jest.fn(),
    onForegroundEvent: jest.fn(),
  },
  AndroidImportance: {
    HIGH: 'high',
  },
  EventType: {
    DISMISSED: 0,
    PRESS: 1,
  },
}));

jest.mock('@react-native-firebase/messaging', () => {
  const mockOnMessage = jest.fn();
  const mockOnNotificationOpenedApp = jest.fn();
  const mockGetInitialNotification = jest.fn(() => Promise.resolve(undefined));
  const mockGetToken = jest.fn();

  return () => ({
    onMessage: mockOnMessage,
    onNotificationOpenedApp: mockOnNotificationOpenedApp,
    getInitialNotification: mockGetInitialNotification,
    getToken: mockGetToken,
  });
});

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('notification utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildDeepLinkFromNotificationData', () => {
    it('Should return browse link if navigationId is browse', () => {
      const data = { navigationId: 'browse' };
      const result = buildDeepLinkFromNotificationData(data);
      expect(result).toBe(LINKING_URL.BROWSE);
    });

    it('Should return product detail link if postId is provided', () => {
      const data = { postId: '123' };
      const result = buildDeepLinkFromNotificationData(data);
      expect(result).toBe(LINKING_URL.PRODUCT_DETAIL('123'));
    });

    it('Should return home link if no navigationId and no postId', () => {
      const data = {};
      const result = buildDeepLinkFromNotificationData(data);
      expect(result).toBe(LINKING_URL.HOME);
    });

    it('Should return home link if data is undefined', () => {
      const result = buildDeepLinkFromNotificationData(undefined);
      expect(result).toBe(LINKING_URL.HOME);
    });
  });

  describe('createNotificationChannel', () => {
    it('Should call notifee.createChannel with correct params', async () => {
      await createNotificationChannel();
      expect(notifee.createChannel).toHaveBeenCalledWith({
        id: 'default',
        name: 'Default Notifications',
        importance: 'high',
      });
    });
  });

  describe('handleForegroundNotifications', () => {
    it('Should display notification when receiving foreground message with notification', async () => {
      const onMessage = messaging().onMessage as jest.Mock;
      let messageHandler: (remoteMessage: any) => void = () => {};

      onMessage.mockImplementation((handler) => {
        messageHandler = handler;
      });

      handleForegroundNotifications();

      const mockMessage = {
        notification: {
          title: 'Test Title',
          body: 'Test Body',
        },
        data: {
          someData: 'value',
        },
      };

      await messageHandler(mockMessage);

      expect(notifee.displayNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Title',
          body: 'Test Body',
          data: { someData: 'value' },
        }),
      );
    });

    it('Should not display notification if remoteMessage.notification is undefined', async () => {
      const onMessage = messaging().onMessage as jest.Mock;
      let messageHandler: (remoteMessage: any) => void = () => {};

      onMessage.mockImplementation((handler) => {
        messageHandler = handler;
      });

      handleForegroundNotifications();

      const mockMessage = {
        data: {
          someData: 'value',
        },
      };

      await messageHandler(mockMessage);

      expect(notifee.displayNotification).not.toHaveBeenCalled();
    });
  });

  describe('handleNotificationOpen', () => {
    it('Should open URL when notification opened from background with valid data', async () => {
      const mockRemoteMessage = { data: { screen: 'Home' } };
      (messaging().onNotificationOpenedApp as jest.Mock).mockImplementationOnce(
        (handler) => {
          handler(mockRemoteMessage);
        },
      );

      (messaging().getInitialNotification as jest.Mock).mockResolvedValue(null);
      (notifee.onForegroundEvent as jest.Mock).mockImplementation(() => {});

      handleNotificationOpen();

      expect(Linking.openURL).toHaveBeenCalledWith(LINKING_URL.HOME);
    });

    it('Should not open URL when notification opened with no data', async () => {
      const mockRemoteMessage = {};
      (messaging().onNotificationOpenedApp as jest.Mock).mockImplementationOnce(
        (handler) => {
          handler(mockRemoteMessage);
        },
      );

      (messaging().getInitialNotification as jest.Mock).mockResolvedValue(null);
      (notifee.onForegroundEvent as jest.Mock).mockImplementation(() => {});

      handleNotificationOpen();

      expect(Linking.openURL).not.toHaveBeenCalled();
    });

    it('Should handle getInitialNotification with valid data', async () => {
      const mockRemoteMessage = { data: { screen: 'Profile' } };

      (messaging().onNotificationOpenedApp as jest.Mock).mockImplementation(
        () => {},
      );
      (messaging().getInitialNotification as jest.Mock).mockResolvedValueOnce(
        mockRemoteMessage,
      );
      (notifee.onForegroundEvent as jest.Mock).mockImplementation(() => {});

      await handleNotificationOpen();

      expect(Linking.openURL).toHaveBeenCalledWith(LINKING_URL.HOME);
    });

    it('Should handle foreground event press with valid data', () => {
      const mockCallback = jest.fn();
      (notifee.onForegroundEvent as jest.Mock).mockImplementationOnce((cb) => {
        mockCallback.mockImplementation(cb);
      });

      (messaging().onNotificationOpenedApp as jest.Mock).mockImplementation(
        () => {},
      );
      (messaging().getInitialNotification as jest.Mock).mockResolvedValue(null);

      handleNotificationOpen();

      mockCallback({
        type: EventType.PRESS,
        detail: { notification: { data: { screen: 'Settings' } } },
      });

      expect(Linking.openURL).toHaveBeenCalledWith(LINKING_URL.HOME);
    });

    it('Should handle foreground event with missing notification', () => {
      const mockCallback = jest.fn();
      (notifee.onForegroundEvent as jest.Mock).mockImplementationOnce((cb) => {
        mockCallback.mockImplementation(cb);
      });

      (messaging().onNotificationOpenedApp as jest.Mock).mockImplementation(
        () => {},
      );
      (messaging().getInitialNotification as jest.Mock).mockResolvedValue(null);

      handleNotificationOpen();

      mockCallback({
        type: EventType.PRESS,
        detail: {},
      });

      expect(Linking.openURL).not.toHaveBeenCalled();
    });
  });

  describe('registerNotificationHandlers', () => {
    it('Should call requestPermission and register handlers', async () => {
      await registerNotificationHandlers();

      expect(notifee.requestPermission).toHaveBeenCalled();
      expect(notifee.createChannel).toHaveBeenCalled();
      expect(messaging().onMessage).toHaveBeenCalled();
      expect(messaging().onNotificationOpenedApp).toHaveBeenCalled();
      expect(notifee.onForegroundEvent).toHaveBeenCalled();
    });
  });

  describe('handleGetDeviceToken', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should get device token and log it', async () => {
      const mockToken = 'mocked-device-token';
      (messaging().getToken as jest.Mock).mockResolvedValueOnce(mockToken);

      await handleGetDeviceToken();

      expect(mockConsoleLog).toHaveBeenCalledWith(
        '==============Device Token==============',
      );
      expect(mockConsoleLog).toHaveBeenCalledWith('= ', mockToken);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '========================================',
      );
    });
  });
});
