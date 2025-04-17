import { memo, useRef, useState } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';

// Components
import { DotItem } from './DotItem';

// Constants
import { IMAGES } from '@/constants';

// Themes
import { getStyles } from './styles';

interface ProductCarouselProps {
  images: string[];
}

export const ProductCarousel = memo(({ images }: ProductCarouselProps) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const styles = getStyles(containerWidth);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    },
  );

  return (
    <View
      testID="product-carousel-container"
      style={styles.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
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
            style={styles.image}
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
