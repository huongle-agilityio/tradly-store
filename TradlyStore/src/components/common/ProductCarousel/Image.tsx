import { memo, useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Constants
import { IMAGES } from '@/constants';

const SCREEN = Dimensions.get('window');

interface ImageProps {
  index: number;
  image: string;
}

export const Image = memo(({ index, image }: ImageProps) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const tapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(250)
    .onStart(() => {
      const nextScale = scale.value > 1 ? 1 : 2.5;
      scale.value = withTiming(nextScale, { duration: 200 });
    });

  const pinchGesture = Gesture.Pinch().onUpdate((event) => {
    const nextScale = scale.value * event.scale;
    scale.value = withTiming(nextScale, { duration: 200 });
  });

  const gesture = Gesture.Simultaneous(tapGesture, pinchGesture);

  const stylesDynamic = useMemo(
    () =>
      StyleSheet.create({
        image: {
          width: '100%',
          height: '100%',
        },
        overlay: {
          width: SCREEN.width,
          height: SCREEN.height,
          justifyContent: 'center',
        },
        animatedView: { width: '100%', height: 500 },
        overlayBackdrop: {
          flex: 1,
          backgroundColor: colors.backgroundOpacity,
        },
      }),
    [colors.backgroundOpacity],
  );

  return (
    <GestureDetector key={index} gesture={gesture}>
      <View style={stylesDynamic.overlay}>
        <Animated.View style={[animatedStyle, stylesDynamic.animatedView]}>
          <FastImage
            style={[stylesDynamic.image, animatedStyle]}
            source={{
              uri: image || IMAGES.BLUR_HASH,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
      </View>
    </GestureDetector>
  );
});
