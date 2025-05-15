import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { LayoutChangeEvent, StyleSheet } from 'react-native';

// Icons
import { ErrorIcon, InfoIcon, OutlineSuccessIcon } from '@/components/icons';

// Interfaces
import { ToastColor } from '@/interfaces';

interface ToastProps {
  description: string;
  variant?: ToastColor;
  duration?: number;
}

export const Toast = memo(
  ({ description, variant = 'default', duration = 400 }: ToastProps) => {
    const { colors } = useTheme();
    const visibleState = useRef(false);
    const [textLength, setTextLength] = useState(0);
    const [toastHeight, setToastHeight] = useState(0);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const transY = useSharedValue(0);
    const transX = useSharedValue(0);

    const colorMap = useMemo(
      () => ({
        default: {
          icon: <InfoIcon width={20} height={20} color={colors.light} />,
          color: colors.toast.default,
        },
        success: {
          icon: (
            <OutlineSuccessIcon width={20} height={20} color={colors.light} />
          ),
          color: colors.toast.success,
        },
        error: {
          icon: <ErrorIcon width={20} height={20} color={colors.light} />,
          color: colors.toast.error,
        },
      }),
      [colors],
    );

    const showToast = useCallback(() => {
      if (!visibleState.current) {
        visibleState.current = true;
        transY.value = withTiming(80, { duration });
        transX.value = withDelay(duration, withTiming(0, { duration }));
      }
    }, [duration, transX, transY]);

    const handleOnFinish = useCallback(() => {
      visibleState.current = false;
    }, []);

    const hideToast = useCallback(() => {
      if (timer.current) clearTimeout(timer.current);

      transX.value = withTiming(textLength + 12, { duration });
      transY.value = withDelay(
        duration,
        withTiming(
          -toastHeight,
          {
            duration,
            easing: Easing.bezierFn(0.36, 0, 0.66, -0.56),
          },
          () => runOnJS(handleOnFinish)(),
        ),
      );
    }, [duration, handleOnFinish, textLength, toastHeight, transX, transY]);

    const handleTextLayout = (event: LayoutChangeEvent) => {
      setTextLength(Math.floor(event.nativeEvent.layout.width));
    };

    const handleViewLayout = (event: LayoutChangeEvent) => {
      setToastHeight(event.nativeEvent.layout.height);
    };

    useEffect(() => {
      if (toastHeight) {
        transY.value = -toastHeight;
      }
    }, [toastHeight, transY]);

    useEffect(() => {
      if (description && textLength > 10 && toastHeight) {
        transX.value = textLength + 12;
        showToast();
        timer.current = setTimeout(() => hideToast(), 4000);
      }

      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }, [description, toastHeight, textLength, transX, showToast, hideToast]);

    const rView = useAnimatedStyle(
      () => ({
        transform: [{ translateY: transY.value }],
        opacity: interpolate(
          transY.value,
          [-toastHeight, 80],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      }),
      [toastHeight],
    );

    const rOuterView = useAnimatedStyle(
      () => ({
        transform: [{ translateX: -Math.max(transX.value, 1) / 2 }],
      }),
      [],
    );

    const rInnerView = useAnimatedStyle(
      () => ({
        transform: [{ translateX: transX.value }],
      }),
      [],
    );

    const rText = useAnimatedStyle(
      () => ({
        opacity: interpolate(transX.value, [0, textLength], [1, 0]),
      }),
      [textLength],
    );

    return (
      <Animated.View
        onLayout={handleViewLayout}
        style={[styles.container, rView]}
      >
        <Animated.View style={[styles.outerContainer, rOuterView]}>
          <Animated.View
            style={[
              styles.innerContainer,
              rInnerView,
              { backgroundColor: colorMap[variant].color },
            ]}
          >
            {colorMap[variant].icon}
            <Animated.Text
              onLayout={handleTextLayout}
              style={[styles.text, rText]}
            >
              {description}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  outerContainer: {
    overflow: 'hidden',
    borderRadius: 40,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 40,
  },
  image: {
    width: 20,
    height: 20,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 12,
    textAlign: 'center',
  },
});
