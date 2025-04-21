import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

import {
  buildDeepLinkFromNotificationData,
  createNotificationChannel,
  handleGetDeviceToken,
} from '../notification';

// Constants
import { LINKING_URL } from '@/constants';

jest.mock('../permission', () => ({
  checkAndRequestNotificationPermission: jest.fn(),
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
      expect(mockConsoleLog).toHaveBeenCalledWith(mockToken);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '========================================',
      );
    });
  });
});
