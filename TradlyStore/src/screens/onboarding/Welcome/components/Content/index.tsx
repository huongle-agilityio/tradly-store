import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

// Mocks
import { ONBOARDING_STEPS_IMAGES } from '@/mocks';

// Components
import { Button, Text } from '@/components/common';

// Hooks
import { useMedia } from '@/hooks';

// Themes
import { radius, spacing } from '@/themes';

// Utils
import { interpolateValue } from '@/utils';
import { useThemeStore } from '@/stores';

interface ContentProps {
  onNavigationLogin: () => void;
}

export const Content = memo(({ onNavigationLogin }: ContentProps) => {
  const { colors } = useTheme();
  const { isTablet, width } = useMedia();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const isDark = useThemeStore((state) => state.isDark);

  const widthContainer = isTablet ? width - 200 : width - 74;
  const buttonText = useMemo(
    () =>
      currentIndex === ONBOARDING_STEPS_IMAGES.length - 1 ? 'Finish' : 'Next',
    [currentIndex],
  );

  const handleOnboardingStep = useCallback(() => {
    if (currentIndex < ONBOARDING_STEPS_IMAGES.length - 1) {
      scrollViewRef.current?.scrollTo({
        // scroll to next step
        x: (currentIndex + 1) * widthContainer,
        animated: true,
      });
    } else {
      onNavigationLogin();
    }
  }, [currentIndex, onNavigationLogin, widthContainer]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
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
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            onMomentumScrollEnd={handleScrollEnd}
            style={stylesDynamic.scroll}
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
                  style={[stylesDynamic.dot, { opacity }]}
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
  dotWrapper: {
    flexDirection: 'row',
    gap: spacing['2.5'],
    justifyContent: 'center',
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
