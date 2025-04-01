import { memo, useRef, useState } from 'react';
import { View, ScrollView, Animated, Image } from 'react-native';

// Components
import { DotItem } from './DotItem';

// Themes
import { getStyles } from './styles';

interface ProductCarouselProps {
  name: string;
  images: string[];
}

export const ProductCarousel = memo(
  ({ images, name }: ProductCarouselProps) => {
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
            <Image
              testID="product-carousel-image"
              key={`product-carousel-image-${index}`}
              alt={`Product image of ${name} - View ${index + 1}`}
              source={{ uri: image }}
              style={styles.image}
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
  },
);

ProductCarousel.displayName = 'ProductCarousel';
