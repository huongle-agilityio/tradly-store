import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
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

  const toggleBackground = useAnimatedStyle(() => {
    return {
      backgroundColor:
        progress.value === 1
          ? colors.toggleTheme.background
          : colors.toggleTheme.backgroundActive,
    };
  });

  const dotToggle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 28 }],
    backgroundColor: colors.toggleTheme.dotBackground,
  }));

  const tapGesture = Gesture.Tap().onEnd(() => {
    const next = progress.value === 1 ? 0 : 1;
    progress.value = withTiming(next, { duration: 250 });
    runOnJS(toggleTheme)();
  });

  useEffect(() => {
    progress.value = withTiming(isDark ? 1 : 0, { duration: 250 });
  }, [progress, isDark]);

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
