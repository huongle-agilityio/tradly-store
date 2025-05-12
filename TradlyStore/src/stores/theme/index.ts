import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { ThemeState, ThemeStore } from './type';

// Constants
import { STORAGE_KEY, THEME } from '@/constants';

const INITIAL_THEME_STATE: ThemeState = {
  isDark: false,
  appTheme: undefined,
  systemTheme: THEME.LIGHT,
};

export const useThemeStore = createWithEqualityFn<ThemeStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_THEME_STATE,

      /**
       * Toggles the theme between light and dark.
       * Always sets appTheme → overrides system.
       */
      toggleTheme: () => {
        const current = get().appTheme ?? get().systemTheme;
        const themeChanged = current === 'dark' ? 'light' : 'dark';
        set({ appTheme: themeChanged, isDark: themeChanged === 'dark' });
      },

      /**
       * User manually sets a theme.
       * If undefined, fallback to system.
       */
      setAppTheme: (appTheme) => {
        const finalTheme = appTheme ?? get().systemTheme;
        set({ appTheme, isDark: finalTheme === 'dark' });
      },

      /**
       * System theme changed.
       * Only applies if user hasn't selected a theme.
       */
      setSystemTheme: (systemTheme) => {
        const finalTheme = get().appTheme ?? systemTheme;
        set({ systemTheme, isDark: finalTheme === 'dark' });
      },
    }),
    {
      name: STORAGE_KEY.THEME,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        appTheme: state.appTheme,
        systemTheme: state.systemTheme,
      }),
    },
  ),
  shallow,
);
