import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import switchTheme from 'react-native-theme-switch-animation';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

// Store
import { useThemeStore } from '@/stores';

export const ToggleThemeSwitch = () => {
  const { colors } = useTheme();
  const [isDark, toggleTheme] = useThemeStore((state) => [
    state.isDark,
    state.toggleTheme,
  ]);

  const progress = useSharedValue(isDark ? 1 : 0);
  const dotTranslateX = useSharedValue(isDark ? 28 : 0);

  const toggleBackground = useAnimatedStyle(() => ({
    backgroundColor:
      progress.value === 1
        ? colors.toggleTheme.background
        : colors.toggleTheme.backgroundActive,
  }));

  const dotToggle = useAnimatedStyle(() => ({
    transform: [{ translateX: dotTranslateX.value }],
    backgroundColor: colors.toggleTheme.dotBackground,
  }));

  const changeTheme = () => {
    switchTheme({
      switchThemeFunction: () => {
        toggleTheme();
      },
      animationConfig: {
        type: 'circular',
        duration: 500,
        startingPoint: {
          cxRatio: 3,
          cyRatio: 1,
        },
      },
    });
  };

  const tapGesture = Gesture.Tap().onEnd(() => {
    const next = progress.value === 1 ? 0 : 1;
    progress.value = next;

    // Animate dot first
    dotTranslateX.value = withTiming(
      next === 1 ? 28 : 0,
      { duration: 300 },
      () => {
        runOnJS(changeTheme)(); // Change theme AFTER animation completes
      },
    );
  });

  useEffect(() => {
    progress.value = isDark ? 1 : 0;
    dotTranslateX.value = withTiming(isDark ? 28 : 0, { duration: 300 });
  }, [dotTranslateX, isDark, progress]);

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[styles.track, toggleBackground]}>
        <Animated.View style={[styles.thumb, dotToggle]} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
});
