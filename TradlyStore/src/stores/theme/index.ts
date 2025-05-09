import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { ColorSchemeName } from 'react-native';
import { shallow } from 'zustand/shallow';
import { ThemeState, ThemeStore } from './type';

// Constants
import { STORAGE_KEY, THEME } from '@/constants';

const INITIAL_THEME_STATE: ThemeState = {
  isDark: false,
  appScheme: undefined,
  systemScheme: THEME.LIGHT,
};

export const useThemeStore = createWithEqualityFn<ThemeStore>()(
  persist(
    (set) => ({
      ...INITIAL_THEME_STATE,

      setAppScheme: (scheme: ColorSchemeName) =>
        set({ appScheme: scheme, isDark: scheme === THEME.DARK }),

      /**
       * Sets the system color scheme to the specified scheme.
       *
       * @param {ColorSchemeName} scheme - The color scheme to set as the system scheme.
       */
      setSystemScheme: (scheme: ColorSchemeName) =>
        set({ systemScheme: scheme, isDark: scheme === THEME.DARK }),
    }),
    {
      name: STORAGE_KEY.THEME,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        appScheme: state.appScheme,
        systemScheme: state.systemScheme,
      }),
    },
  ),
  shallow,
);
