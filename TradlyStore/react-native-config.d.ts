// Autocompletion and typesafety for .env files.
declare module 'react-native-config' {
  export interface NativeConfig {
    ENABLE_STORYBOOK?: string;
    API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
