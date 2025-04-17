import { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  GestureResponderEvent,
  PerformanceMeasureView,
  useStartProfiler,
} from '@shopify/react-native-performance';

// Mocks
import { ONBOARDING_STEPS_IMAGES } from '@/mocks';

// Components
import { Button, Text } from '@/components/common';

// Constants
import { SCREENS } from '@/constants';

// Hooks
import { useMedia } from '@/hooks';

// Themes
import { colors, radius, spacing } from '@/themes';

// Utils
import { interpolateValue } from '@/utils';

interface ContentProps {
  onNavigationLogin: () => void;
}

export const Content = memo(({ onNavigationLogin }: ContentProps) => {
  const startNavigationTTITimer = useStartProfiler();

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const { isTablet, width } = useMedia();
  const [currentIndex, setCurrentIndex] = useState(0);

  const widthContainer = isTablet ? width - 200 : width - 74;
  const buttonText = useMemo(
    () =>
      currentIndex === ONBOARDING_STEPS_IMAGES.length - 1 ? 'Finish' : 'Next',
    [currentIndex],
  );

  const handleOnboardingStep = useCallback(
    (uiEvent?: GestureResponderEvent) => {
      if (currentIndex < ONBOARDING_STEPS_IMAGES.length - 1) {
        scrollViewRef.current?.scrollTo({
          // scroll to next step
          x: (currentIndex + 1) * widthContainer,
          animated: true,
        });
      } else {
        startNavigationTTITimer({
          source: SCREENS.ONBOARDING,
          uiEvent,
        });
        onNavigationLogin();
      }
    },
    [currentIndex, onNavigationLogin, startNavigationTTITimer, widthContainer],
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  /**
   * Function check scroll end and set current index for dots
   */
  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(contentOffsetX / widthContainer);
      setCurrentIndex(newIndex);
    },
    [widthContainer],
  );

  return (
    <PerformanceMeasureView interactive={true} screenName={SCREENS.ONBOARDING}>
      <View style={styles.container}>
        <View style={styles.headerWrapper} />
        <View
          style={[
            styles.content,
            {
              width: widthContainer,
            },
          ]}
        >
          <View style={styles.slideWrapper}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={handleScroll}
              onMomentumScrollEnd={handleScrollEnd}
              style={styles.scroll}
            >
              {ONBOARDING_STEPS_IMAGES.map(({ image, title, alt }, index) => (
                <View
                  key={index}
                  style={[styles.imageWrapper, { width: widthContainer }]}
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
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.dotWrapper}>
              {ONBOARDING_STEPS_IMAGES.map((_, index) => {
                const opacity = interpolateValue(
                  scrollX,
                  index,
                  widthContainer,
                  [0.4, 1, 0.4],
                );

                return (
                  <Animated.View
                    key={index}
                    style={[styles.dot, { opacity }]}
                  />
                );
              })}
            </View>

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
    </PerformanceMeasureView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  headerWrapper: {
    backgroundColor: colors.primary,
    width: '100%',
    height: '40%',
  },
  scroll: {
    paddingTop: 57,
    backgroundColor: colors.light,
    borderRadius: radius.lg,
  },
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
  dotWrapper: {
    flexDirection: 'row',
    gap: spacing['2.5'],
    justifyContent: 'center',
  },
  dot: {
    width: spacing[3],
    height: spacing[3],
    borderRadius: radius.full,
    backgroundColor: colors.primary,
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
