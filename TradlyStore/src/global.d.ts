// global.d.ts
import '@react-navigation/native';

declare module '@react-navigation/native' {
  export type Theme = {
    dark: boolean;
    colors: {
      transparent: string;
      primary: string;
      secondary: string;
      tertiary: string;
      light: string;
      placeholder: string;
      error: string;
      success: string;
      opacity: string;
      link: string;
      dotNotification: string;
      border: string;

      text: {
        default: string;
        light: string;
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
        placeholder: string;
        fade: string;
        link: string;
        error: string;
        success: string;
      };
      skeleton: {
        backgroundPrimary: string;
        backgroundSecondary: string;
      };
      button: {
        backgroundPrimary: string;
        backgroundSecondary: string;
        success: string;
        error: string;
        textPrimary: string;
        textSecondary: string;
        textDark: string;
      };
      toast: {
        default: string;
        success: string;
        error: string;
      };
      input: {
        backgroundPrimary: string;
        borderPrimary: string;
        borderSecondary: string;
        textPrimary: string;
        textSecondary: string;
        textTertiary: string;
        textQuaternary: string;
      };
      select: {
        backgroundPrimary: string;
        badge: string;
        textPrimary: string;
      };
      productCard: {
        background: string;
        border: string;
        textSecondary: string;
        textPrimary: string;
        textTertiary: string;
      };
      storeCard: {
        background: string;
        text: string;
      };
      categoryCard: {
        background: string;
        border: string;
        text: string;
      };
      tabItem: {
        textPrimary: string;
        textSecondary: string;
      };
      cartItem: {
        background: string;
        textPrimary: string;
        textSecondary: string;
      };
    };
  };
  export function useTheme(): Theme;
}
