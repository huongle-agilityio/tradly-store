import Constants from 'expo-constants';

export const BASE_API = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ?? process.env.EXPO_PUBLIC_API_URL;
