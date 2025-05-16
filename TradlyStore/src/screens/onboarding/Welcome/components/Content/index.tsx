import { memo, useCallback, useMemo, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  scrollTo,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// Mocks
import { ONBOARDING_STEPS_IMAGES } from '@/mocks';

// Components
import { CarouselDots } from '../CarouselDots';
import { Button, Text } from '@/components/common';

// Hooks
import { useMedia } from '@/hooks';

// Stores
import { useThemeStore } from '@/stores';

// Themes
import { radius, spacing } from '@/themes';

interface ContentProps {
  onNavigationLogin: () => void;
}

export const Content = memo(({ onNavigationLogin }: ContentProps) => {
  const { colors } = useTheme();
  const { isTablet, width } = useMedia();
  const [reactIndex, setReactIndex] = useState(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const currentIndex = useSharedValue(0);
  const translationX = useSharedValue(0);

  // Store
  const isDark = useThemeStore((state) => state.isDark);

  const widthContainer = isTablet ? width - 200 : width - 74;
  const buttonText = useMemo(
    () =>
      reactIndex === ONBOARDING_STEPS_IMAGES.length - 1 ? 'Finish' : 'Next',
    [reactIndex],
  );
  const stylesDynamic = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: isDark ? colors.background : colors.light,
        },
        headerWrapper: {
          backgroundColor: colors.primary,
          width: '100%',
          height: '40%',
        },
        scroll: {
          paddingTop: 57,
          backgroundColor: isDark ? colors.background : colors.light,
          borderRadius: radius.lg,
        },
        dot: {
          width: spacing[3],
          height: spacing[3],
          borderRadius: radius.full,
          backgroundColor: isDark ? colors.light : colors.primary,
        },
      }),
    [colors, isDark],
  );

  const handleIndexChange = useCallback((index: number) => {
    setReactIndex(index);
  }, []);

  const handleOnboardingStep = useCallback(() => {
    if (reactIndex < ONBOARDING_STEPS_IMAGES.length - 1) {
      currentIndex.value += 1;
      scrollTo(scrollRef, currentIndex.value * widthContainer, 0, true);
      setReactIndex(currentIndex.value);
    } else {
      onNavigationLogin();
    }
  }, [reactIndex, currentIndex, scrollRef, widthContainer, onNavigationLogin]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const maxIndex = ONBOARDING_STEPS_IMAGES.length - 1;

      const shouldSwipeLeft =
        event.translationX < 0 && currentIndex.value < maxIndex;
      const shouldSwipeRight = event.translationX > 0 && currentIndex.value > 0;

      if (shouldSwipeLeft || shouldSwipeRight) {
        translationX.value = event.translationX;
      } else {
        translationX.value = 0;
      }
    })
    .onEnd((event) => {
      const threshold = 50;
      const maxIndex = ONBOARDING_STEPS_IMAGES.length - 1;

      if (event.translationX < -threshold && currentIndex.value < maxIndex) {
        currentIndex.value += 1;
      } else if (event.translationX > threshold && currentIndex.value > 0) {
        currentIndex.value -= 1;
      }

      runOnJS(handleIndexChange)(currentIndex.value);

      translationX.value = withTiming(0, { duration: 300 });

      scrollTo(scrollRef, currentIndex.value * widthContainer, 0, true);
    });

  /**
   * Generates an animated style for the onboarding image based on the swiping progress.
   * The style will change the opacity and translateX of the image as the user swipes.
   * The current visible slide will fade out and slightly move left/right when dragging.
   * The next slide (user is swiping to the left) will fade in and slide in from right.
   * The previous slide (user is swiping to the right) will fade in and slide in from left.
   * All other slides remain hidden.
   * @param {number} index The index of the slide to generate the style for.
   * @returns {AnimatedStyleProp<ViewStyle>} The animated style for the image.
   */
  const animatedImageStyle = (index: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedStyle(() => {
      const progress = translationX.value / widthContainer;

      let opacity = 1;
      let translateX = 0;

      // current visible slide
      if (index === currentIndex.value) {
        // Fade out and slightly move left/right when dragging
        opacity = withTiming(1 - Math.min(Math.abs(progress), 0.4), {
          duration: 400,
        });
        translateX = withTiming(translationX.value * 0.3, { duration: 400 });

        // next slide (user is swiping to the left)
      } else if (index === currentIndex.value + 1 && translationX.value < 0) {
        // Fade in and slide in from right
        opacity = withTiming(Math.min(Math.abs(progress), 1), {
          duration: 400,
        });
        translateX = withTiming(widthContainer + translationX.value * 0.7, {
          duration: 400,
        });

        // previous slide (user is swiping to the right)
      } else if (index === currentIndex.value - 1 && translationX.value > 0) {
        // Fade in and slide in from left
        opacity = withTiming(Math.min(Math.abs(progress), 1), {
          duration: 400,
        });
        translateX = withTiming(-widthContainer + translationX.value * 0.7, {
          duration: 400,
        });

        // All other slides remain hidden
      } else {
        opacity = withTiming(0, { duration: 200 });
      }

      return {
        transform: [{ translateX }],
        opacity,
      };
    });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={stylesDynamic.container}>
        <View style={stylesDynamic.headerWrapper} />
        <View
          style={[
            styles.content,
            {
              width: widthContainer,
            },
          ]}
        >
          <View style={styles.slideWrapper}>
            <Animated.ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              style={stylesDynamic.scroll}
            >
              {ONBOARDING_STEPS_IMAGES.map(({ image, title, alt }, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.imageWrapper,
                    { width: widthContainer },
                    animatedImageStyle(index),
                  ]}
                >
                  <Animated.Image
                    source={image}
                    alt={alt}
                    resizeMode="contain"
                    width={width - 80}
                  />
                  <Text
                    fontSize="xl"
                    fontWeight="normal"
                    color="primary"
                    textStyle={styles.title}
                  >
                    {title}
                  </Text>
                </Animated.View>
              ))}
            </Animated.ScrollView>
          </View>

          <View style={styles.wrapper}>
            <CarouselDots
              currentIndex={currentIndex}
              dataLength={ONBOARDING_STEPS_IMAGES.length}
              slideIndex={reactIndex}
              translationX={translationX}
              widthContainer={widthContainer}
            />

            <Button
              size="full"
              onPress={handleOnboardingStep}
              textSize="xl"
              buttonStyles={{ height: spacing[12] }}
              textStyles={styles.button}
            >
              {buttonText}
            </Button>
          </View>
        </View>
      </View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    height: '60%',
    position: 'relative',
    justifyContent: 'flex-end',
    paddingBottom: spacing['7.5'],
  },
  slideWrapper: {
    position: 'absolute',
    top: -150,
  },
  imageWrapper: {
    alignItems: 'center',
    gap: 100,
  },
  title: {
    textAlign: 'center',
    paddingHorizontal: spacing['2.5'],
  },
  button: { width: '100%', textAlign: 'center' },
  wrapper: {
    gap: 50,
  },
});
