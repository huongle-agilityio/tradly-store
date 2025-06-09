import Constants from 'expo-constants';

export const BASE_API =
  process.env.EXPO_PUBLIC_API_URL ?? Constants.expoConfig?.extra?.API_URL;
