// Autocompletion and typesafety for .env files.
declare module 'react-native-config' {
  export interface NativeConfig {
    GOOGLE_MAPS_API_KEY?: string;
    API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
