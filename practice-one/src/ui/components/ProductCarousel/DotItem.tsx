import { memo } from 'react';
import { Animated } from 'react-native';

// Themes
import { colors, radius } from '@/ui/themes';

// Utils
import { interpolateValue } from '@/utils';

interface DotItemProps {
  scrollX: Animated.Value;
  index: number;
  width: number;
}

export const DotItem = memo(({ scrollX, index, width }: DotItemProps) => {
  const dotOpacity = interpolateValue(scrollX, index, width, [0.4, 1, 0.4]);
  const dotColor = interpolateValue(scrollX, index, width, [
    colors.light,
    colors.primary,
    colors.light,
  ]);
  const dotSize = interpolateValue(scrollX, index, width, [6, 8, 6]);

  return (
    <Animated.View
      testID="product-carousel-dot-item"
      style={{
        width: dotSize,
        height: dotSize,
        borderRadius: radius.full,
        backgroundColor: dotColor,
        opacity: dotOpacity,
      }}
    />
  );
});

DotItem.displayName = 'DotItem';
