// Autocompletion and typesafety for .env files.
declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    UPLOAD_IMAGE_URL?: string;
    KEY_UPLOAD_IMAGE?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
