import { useEffect, useMemo } from 'react';
import { View, Animated, Easing, ViewStyle } from 'react-native';
import { styles } from './styles';

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
  const shimmerAnim = useMemo(() => new Animated.Value(0), []);

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
      ]}
    >
      <Animated.View
        testID="skeleton-shimmer"
        style={[styles.overlay, shimmerStyle]}
      />
    </View>
  );
};
