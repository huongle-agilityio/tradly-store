import { ColorSchemeName } from 'react-native';

export interface ThemeState {
  isDark?: boolean;
  appTheme: ColorSchemeName;
  systemTheme: ColorSchemeName;
}

export interface ThemeStore extends ThemeState {
  toggleTheme: () => void;
  setAppTheme: (scheme: ColorSchemeName) => void;
  setSystemTheme: (scheme: ColorSchemeName) => void;
}
