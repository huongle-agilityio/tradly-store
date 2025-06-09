import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: 'huong.le',
  name: 'practice-one',
  slug: 'practice-one',
  scheme: 'practice-one',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './src/assets/splash-icon-dark.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'practice.one.tradly',
    icon: './src/assets/adaptive-icon.png',
  },
  android: {
    package: 'practice.one.tradly',
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './src/assets/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-asset',
    [
      'expo-secure-store',
      {
        configureAndroidBackup: true,
        faceIDPermission:
          'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
      },
    ],
    [
      'expo-splash-screen',
      {
        backgroundColor: '#fff',
        image: './src/assets/splash-icon-dark.png',
        dark: {
          image: './src/assets/splash-icon-light.png',
          backgroundColor: '#000',
        },
        imageWidth: 200,
      },
    ],
  ],
  extra: {
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    storybookEnabled: process.env.EXPO_PUBLIC_ENABLE_STORYBOOK === 'true',
    eas: {
      projectId: 'c680031e-85e2-4a05-afad-79f999221818',
    },
  },
});
