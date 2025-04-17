import { memo, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { colorMap, styles } from './styles';

// Components
import { Text } from '../Text';

// Constants
import { TIMING } from '@/constants';

// Stores
import { useToast } from '@/stores';

// Interfaces
import { ToastColor } from '@/interfaces';

interface ToastProps {
  description: string;
  variant?: ToastColor;
}

export const Toast = memo(
  ({ description, variant = 'default' }: ToastProps) => {
    const closeToast = useToast((state) => state.closeToast);
    const animatedValue = useRef(new Animated.Value(100)).current;

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
