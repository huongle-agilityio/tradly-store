import { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';

// Mocks
import { ONBOARDING_STEPS_IMAGES } from '@/mocks';

// Components
import { Button, Text } from '@/ui/components';

// Constants
import { SCREEN_ROUTES } from '@/constants';

// Themes
import { spacing } from '@/ui/themes';

export const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const buttonText = useMemo(
    () =>
      currentIndex === ONBOARDING_STEPS_IMAGES.length - 1 ? 'Finish' : 'Next',
    [currentIndex],
  );

  const handleOnboardingStep = useCallback(() => {
    if (currentIndex < ONBOARDING_STEPS_IMAGES.length - 1) {
      // Fade animation from 0.5
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => prev + 1);

        // Fade animation to 1
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      router.replace(SCREEN_ROUTES.LOGIN);
    }
  }, [currentIndex, fadeAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.imageWrapper}>
          <Animated.Image
            source={ONBOARDING_STEPS_IMAGES[currentIndex].image}
            alt={ONBOARDING_STEPS_IMAGES[currentIndex].alt}
            style={[
              styles.image,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.bottomContentWrapper}>
        <Text
          fontSize="xl"
          fontWeight="normal"
          color="primary"
          textStyle={{ textAlign: 'center' }}
        >
          {ONBOARDING_STEPS_IMAGES[currentIndex].title}
        </Text>
        <View style={{ flexDirection: 'row', gap: spacing['2.5'] }}>
          {ONBOARDING_STEPS_IMAGES.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  opacity: currentIndex === index ? 1 : 0.4,
                },
              ]}
            />
          ))}
        </View>
        <Button
          size="full"
          onPress={handleOnboardingStep}
          textSize="xl"
          buttonStyles={{ height: spacing[12] }}
        >
          {buttonText}
        </Button>
      </View>
    </View>
  );
};
