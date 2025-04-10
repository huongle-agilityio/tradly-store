import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import perf, { FirebasePerformanceTypes } from '@react-native-firebase/perf';

/**
 * Automatically trace the screen by using the React Navigation's
 * useFocusEffect hook.
 *
 * @param screenName The name of the screen to trace.
 *
 * @example
 * useScreenTrace(SCREENS.HOME);
 */
export const useScreenTrace = (screenName: string) => {
  useFocusEffect(
    useCallback(() => {
      let trace: FirebasePerformanceTypes.ScreenTrace | null = null;

      const start = async () => {
        try {
          trace = await perf().startScreenTrace(screenName);
        } catch (e) {
          console.warn('startScreenTrace failed', e);
        }
      };

      const stop = async () => {
        if (trace) {
          try {
            await trace.stop();
          } catch (e) {
            console.warn('stopScreenTrace failed', e);
          }
        }
      };

      start();

      return () => {
        stop();
      };
    }, [screenName]),
  );
};
