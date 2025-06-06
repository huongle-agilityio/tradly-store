import { memo, useCallback, useMemo, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@react-navigation/native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {
  View,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Components
import { DotItem } from './DotItem';
import { ImageOverlay } from './ImageOverlay';

// Constants
import { IMAGES } from '@/constants';

interface ProductCarouselProps {
  images: string[];
}

export const ProductCarousel = memo(({ images }: ProductCarouselProps) => {
  const { colors } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const scrollX = useSharedValue(0);

  const stylesDynamic = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.opacity,
        },
        image: {
          width: containerWidth,
          height: '100%',
          resizeMode: 'cover',
        },
      }),
    [colors.opacity, containerWidth],
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }, []);

  const handleOpenOverlay = () => {
    setOverlayVisible(true);
  };

  const toggleOverlay = useCallback(() => {
    setOverlayVisible((prev) => !prev);
  }, []);

  return (
    <View
      testID="product-carousel-container"
      style={[styles.container, stylesDynamic.container]}
      onLayout={handleLayout}
    >
      <Animated.ScrollView
        testID="product-carousel-scroll"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={`product-carousel-image-${index}`}
            onPress={handleOpenOverlay}
          >
            <FastImage
              testID="product-carousel-image"
              style={stylesDynamic.image}
              source={{
                uri: image || IMAGES.BLUR_HASH,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

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

      {/* Overlay Modal */}
      <ImageOverlay
        images={images}
        isOverlayVisible={isOverlayVisible}
        toggleOverlay={toggleOverlay}
        scrollHandler={scrollHandler}
      />
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
