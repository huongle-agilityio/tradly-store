import { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';

// Components
import { Button, Text } from '@/ui/components';

// Constants
import { SCREEN_ROUTES } from '@/constants';

// Themes
import { spacing } from '@/ui/themes';

export const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const images = [
    {
      image: require('@/assets/online-shopping.png'),
      title: 'Empowering Artisans, Farmers & Micro Business',
    },
    {
      image: require('@/assets/digital-collaboration.png'),
      title: 'Connecting NGOs, Social Enterprises with Communities',
    },
    {
      image: require('@/assets/technical-analysis-collaboration.png'),
      title: ' Donate, Invest & Support infrastructure projects',
    },
  ];

  const buttonText = useMemo(
    () => (currentIndex === images.length - 1 ? 'Finish' : 'Next'),
    [currentIndex, images.length],
  );

  const handleOnboardingStep = useCallback(() => {
    if (currentIndex < images.length - 1) {
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
  }, [currentIndex, fadeAnim, images.length]);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.imageWrapper}>
          <Animated.Image
            source={images[currentIndex].image}
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
          {images[currentIndex].title}
        </Text>
        <View style={{ flexDirection: 'row', gap: spacing['2.5'] }}>
          {images.map((_, index) => (
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
