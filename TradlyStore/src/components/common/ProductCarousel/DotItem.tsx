import { memo } from 'react';
import { useTheme } from '@react-navigation/native';
import { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';

// Themes
import { radius } from '@/themes';

interface DotItemProps {
  scrollX: SharedValue<number>;
  index: number;
  width: number;
}

export const DotItem = memo(({ scrollX, index, width }: DotItemProps) => {
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const size = interpolate(scrollX.value, inputRange, [6, 8, 6]);
    const opacity = interpolate(scrollX.value, inputRange, [0.4, 1, 0.4]);
    const backgroundColor = interpolateColor(scrollX.value, inputRange, [
      colors.light,
      colors.primary,
      colors.light,
    ]);

    return {
      width: size,
      height: size,
      borderRadius: radius.full,
      backgroundColor,
      opacity,
      marginHorizontal: 4,
    };
  });

  return (
    <Animated.View testID="product-carousel-dot-item" style={animatedStyle} />
  );
});
