import { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

// Components
import { Text } from '../Text';

// Constants
import { TIMING } from '@/constants';

// Stores
import { useToast } from '@/stores';

// Themes
import { radius, spacing } from '@/themes';

// Interfaces
import { ToastColor } from '@/interfaces';
import { useTheme } from '@react-navigation/native';

interface ToastProps {
  description: string;
  variant?: ToastColor;
}

export const Toast = memo(
  ({ description, variant = 'default' }: ToastProps) => {
    const closeToast = useToast((state) => state.closeToast);
    const animatedValue = useRef(new Animated.Value(100)).current;

    const { colors } = useTheme();
    const colorMap = useMemo(
      () => ({
        default: colors.toast.default,
        success: colors.toast.success,
        error: colors.toast.error,
      }),
      [colors.toast.default, colors.toast.success, colors.toast.error],
    );

    // Animation from bottom to top
    useEffect(() => {
      if (description) {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animatedValue, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }, [animatedValue, description]);

    // Close toast after duration
    useEffect(() => {
      const timer = setTimeout(() => closeToast(), TIMING.TOAST_DURATION);

      return () => {
        clearTimeout(timer);
      };
    }, [closeToast]);

    return (
      <Animated.View
        style={[
          {
            transform: [{ translateY: animatedValue }],
            backgroundColor: colorMap[variant],
          },
          styles.container,
        ]}
      >
        <Text color="light">{description}</Text>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing['2.5'],
    paddingHorizontal: spacing[4],
    position: 'absolute',
    alignSelf: 'center',
    bottom: '12%',
    borderRadius: radius.full,
    elevation: 5,
  },
});
