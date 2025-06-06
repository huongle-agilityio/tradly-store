import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

// Components
import { Dot } from './Dot';

// Themes
import { radius, spacing } from '@/themes';

interface CarouselDotsProps {
  dataLength: number;
  slideIndex: number;
  widthContainer: number;
  currentIndex: SharedValue<number>;
  translationX: SharedValue<number>;
}

export const CarouselDots = memo(
  ({
    dataLength,
    widthContainer,
    translationX,
    currentIndex,
    slideIndex,
  }: CarouselDotsProps) => {
    const { colors } = useTheme();

    const dotSize = spacing[3];
    const dotSpacing = spacing[3] + spacing[2.5];
    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          slidingDot: {
            width: dotSize * dataLength + 20,
            position: 'absolute',
          },
        }),
      [dataLength, dotSize],
    );

    const animatedConnectorStyle = useAnimatedStyle(() => {
      const progress = translationX.value / widthContainer;
      const clampedProgress = Math.max(-1, Math.min(1, progress));
      const direction = clampedProgress >= 0 ? 1 : -1;
      const baseIndex = currentIndex.value;
      const nextIndex = baseIndex + direction;

      const safeNextIndex = Math.max(0, Math.min(dataLength - 1, nextIndex));

      const fromX = dotSpacing * baseIndex;
      const toX = dotSpacing * safeNextIndex;

      // Interpolate left position moving from fromX to toX
      const left = interpolate(
        Math.abs(clampedProgress),
        [0, 1],
        [fromX, Math.min(fromX, toX)],
      );

      // Interpolate width expanding between dotSize and distance between dots + dotSize
      const width = interpolate(
        Math.abs(clampedProgress),
        [0, 1],
        [dotSize, Math.abs(toX - fromX) + dotSize],
      );

      return {
        height: dotSize,
        borderRadius: radius.full,
        backgroundColor: colors.primary,
        left,
        width,
      };
    });

    return (
      <View style={styles.dotWrapper}>
        <View style={stylesDynamic.slidingDot}>
          <Animated.View style={animatedConnectorStyle} />
        </View>
        {Array.from({ length: dataLength }).map((_, index) => (
          <Dot
            key={index}
            currentIndex={currentIndex}
            index={index}
            slideIndex={slideIndex}
          />
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  dotWrapper: {
    flexDirection: 'row',
    gap: spacing['2.5'],
    justifyContent: 'center',
    position: 'relative',
    height: spacing[3],
  },
});
