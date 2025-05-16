import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

// Stores
import { useThemeStore } from '@/stores';

// Theme
import { radius, spacing } from '@/themes';

interface DotProps {
  index: number;
  slideIndex: number;
  currentIndex: SharedValue<number>;
}

export const Dot = memo(({ index, currentIndex, slideIndex }: DotProps) => {
  const { colors } = useTheme();
  const isDark = useThemeStore((state) => state.isDark);

  const stylesDynamic = useMemo(
    () =>
      StyleSheet.create({
        dot: {
          width: spacing[3],
          height: spacing[3],
          borderRadius: radius.full,
          backgroundColor: isDark ? colors.light : colors.primary,
          opacity: slideIndex === index ? 1 : 0.4,
        },
      }),
    [colors, index, isDark, slideIndex],
  );

  const scale = useDerivedValue(() =>
    withTiming(index === currentIndex.value ? 1.2 : 1, {
      duration: 300,
    }),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={[stylesDynamic.dot, animatedStyle]} />;
});
