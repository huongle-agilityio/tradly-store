import { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Animated,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

// Components
import { DotItem } from './DotItem';

// Constants
import { IMAGES } from '@/constants';

interface ProductCarouselProps {
  images: string[];
}

export const ProductCarousel = memo(({ images }: ProductCarouselProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const stylesDynamic = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.opacity,
        },
        image: {
          width: containerWidth,
          resizeMode: 'cover',
        },
      }),
    [colors.opacity, containerWidth],
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    },
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }, []);

  return (
    <View
      testID="product-carousel-container"
      style={[styles.container, stylesDynamic.container]}
      onLayout={handleLayout}
    >
      <ScrollView
        testID="product-carousel-scroll"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <FastImage
            testID="product-carousel-image"
            key={`product-carousel-image-${index}`}
            style={stylesDynamic.image}
            source={{
              uri: image || IMAGES.BLUR_HASH,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ))}
      </ScrollView>

      <View style={styles.dotWrapper}>
        {images.map((_, index) => (
          <DotItem
            key={`product-carousel-dot-${index}`}
            scrollX={scrollX}
            index={index}
            width={containerWidth}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  dotWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: 15,
    zIndex: 999,
    gap: 5,
  },
});
