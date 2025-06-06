import { useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors, spacing } from '@/themes';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const HomeAnimationIcon = ({
  width,
  height,
  size = spacing[5],
  color = colors.placeholder,
  ...props
}: SvgFactoryProps) => {
  const dashOffset = useSharedValue(100);
  const PATH_LENGTH = 100;

  useEffect(() => {
    dashOffset.value = withRepeat(
      withTiming(0, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [dashOffset]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  return (
    <Svg
      width={width || size}
      height={height || size}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <AnimatedPath
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        strokeDasharray={PATH_LENGTH}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};
