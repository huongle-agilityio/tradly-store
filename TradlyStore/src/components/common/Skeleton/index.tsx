import { memo, useEffect, useMemo } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface SkeletonProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton = memo(
  ({ width, height, borderRadius = 8, style }: SkeletonProps) => {
    const { colors } = useTheme();
    const shimmerAnim = useSharedValue(0);

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          container: {
            backgroundColor: colors.skeleton.backgroundPrimary,
          },
          overlay: {
            backgroundColor: colors.skeleton.backgroundSecondary,
          },
        }),
      [colors.skeleton.backgroundPrimary, colors.skeleton.backgroundSecondary],
    );

    useEffect(() => {
      shimmerAnim.value = withRepeat(
        withTiming(1, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        true,
      );
    }, [shimmerAnim]);

    const shimmerStyle = useAnimatedStyle(() => ({
      opacity: interpolate(shimmerAnim.value, [0, 0.2, 1], [0.2, 1, 0.2]),
    }));

    return (
      <View
        testID="skeleton-container"
        style={[
          styles.container,
          { width, height, borderRadius } as ViewStyle,
          stylesDynamic.container,
          style,
        ]}
      >
        <Animated.View
          testID="skeleton-shimmer"
          style={[styles.overlay, stylesDynamic.overlay, shimmerStyle]}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    opacity: 0.4,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
