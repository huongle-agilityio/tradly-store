import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import { styles } from './styles';

// Mocks
import { ONBOARDING_STEPS_IMAGES } from '@/mocks';

// Components
import { Button, Text } from '@/ui/components';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { PublicScreenProps } from '@/interfaces';

// Hooks
import { useMedia } from '@/hooks';

// Themes
import { spacing } from '@/ui/themes';

// Utils
import { interpolateValue } from '@/utils';

export const Onboarding = ({
  navigation,
}: PublicScreenProps<typeof SCREENS.ONBOARDING>) => {
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

  const handleOnboardingStep = useCallback(() => {
    if (currentIndex < ONBOARDING_STEPS_IMAGES.length - 1) {
      scrollViewRef.current?.scrollTo({
        // scroll to next step
        x: (currentIndex + 1) * widthContainer,
        animated: true,
      });
    } else {
      navigation.navigate(SCREENS.LOGIN);
    }
  }, [currentIndex, navigation, widthContainer]);

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
                <Animated.View key={index} style={[styles.dot, { opacity }]} />
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
};
