import { ColorSchemeName } from 'react-native';

export interface ThemeState {
  appScheme: ColorSchemeName;
  systemScheme: ColorSchemeName;
  theme?: ColorSchemeName;
}

export interface ThemeStore extends ThemeState {
  setAppScheme: (scheme: ColorSchemeName) => void;
  setSystemScheme: (scheme: ColorSchemeName) => void;
}
