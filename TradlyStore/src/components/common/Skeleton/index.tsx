import { useEffect, useMemo } from 'react';
import { View, Animated, Easing, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface SkeletonProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton = ({
  width,
  height,
  borderRadius = 8,
  style,
}: SkeletonProps) => {
  const { colors } = useTheme();

  const shimmerAnim = useMemo(() => new Animated.Value(0), []);
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
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  const shimmerStyle = {
    opacity: shimmerAnim.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0.3, 1, 0.3],
    }),
  };

  return (
    <View
      testID="skeleton-container"
      style={[
        styles.container,
        { width, height, borderRadius } as ViewStyle,
        style,
        stylesDynamic.container,
      ]}
    >
      <Animated.View
        testID="skeleton-shimmer"
        style={[styles.overlay, shimmerStyle, stylesDynamic.overlay]}
      />
    </View>
  );
};

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
