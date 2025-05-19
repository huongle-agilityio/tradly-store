import { memo, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Image, View, StyleSheet } from 'react-native';

// Components
import { Header } from '../Header';
import { StickyFooter } from '@/components/shared';
import { ProductInformation } from '../ProductInformation';
import { Button, Skeleton, Text } from '@/components/common';

// Interfaces
import { Store } from '@/interfaces';

// Stores
import { useThemeStore } from '@/stores';

// Themes
import { lineHeights, radius, spacing } from '@/themes';

// Utils
import { calculateDiscountedPrice, getProductDetails } from '@/utils';

interface ContentProps {
  price: number;
  quantity: number;
  title: string;
  priceType: string;
  category: string;
  location: string;
  discount?: number;
  isLoading?: boolean;
  slideImages: string[];
  description?: string;
  store?: Store;
  handleBack: () => void;
  handleAddToCart: () => void;
}

export const Content = memo(
  ({
    priceType,
    category,
    location,
    slideImages,
    title,
    quantity,
    price,
    isLoading,
    handleAddToCart,
    handleBack,
    description,
    discount,
    store,
  }: ContentProps) => {
    const { colors } = useTheme();
    const scrollY = useSharedValue(0);
    const opacity = useSharedValue(1);

    const isDark = useThemeStore((state) => state.isDark);

    const productInfo = getProductDetails({ priceType, category, location });
    const productAdditional = [
      {
        title: 'Delivery Details',
        value: 'Home Delivery Available, Cash On Delivery',
      },
    ];
    const isSoldOut = quantity <= 0;

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          contentContainerStyle: {
            backgroundColor: isDark
              ? colors.backgroundSecondary
              : colors.tertiary,
          },
          contentWrapper: {
            borderRadius: radius.lg,
            backgroundColor: colors.backgroundSecondary,
          },
          banner: {
            marginLeft: 10,
            backgroundColor: colors.error,
            borderRadius: 8,
            paddingVertical: 2,
            paddingHorizontal: 6,
          },
        }),
      [colors.backgroundSecondary, colors.error, colors.tertiary, isDark],
    );

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
        opacity.value = event.contentOffset.y;
      },
    });

    return (
      <StickyFooter
        isLoading={isLoading}
        disabled={isSoldOut}
        buttonText="Add to Cart"
        onPress={handleAddToCart}
      >
        <Header
          scrollY={scrollY}
          opacity={opacity}
          slideImages={slideImages}
          handleBack={handleBack}
        />
        <Animated.ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          contentContainerStyle={[
            styles.contentContainerStyle,
            stylesDynamic.contentContainerStyle,
          ]}
        >
          <View style={[styles.productWrapper, stylesDynamic.contentWrapper]}>
            <Text
              color="placeholder"
              fontSize="lg"
              fontWeight="bold"
              textStyle={{ lineHeight: lineHeights.md }}
            >
              {title}
            </Text>
            {isLoading ? (
              <View style={styles.loading}>
                <Skeleton width="40%" height={20} borderRadius={4} />
              </View>
            ) : (
              <>
                <View style={styles.price}>
                  <Text fontSize="lg" fontWeight="bold" color="secondary">
                    ${calculateDiscountedPrice(price, discount)}
                  </Text>
                  {!!discount && (
                    <>
                      <Text
                        fontWeight="normal"
                        color="placeholder"
                        textStyle={styles.textPrice}
                      >
                        ${price}
                      </Text>
                      <Text fontWeight="normal" color="placeholder">
                        {discount}% off
                      </Text>
                    </>
                  )}
                  {isSoldOut && (
                    <Text color="light" textStyle={stylesDynamic.banner}>
                      SOLD OUT
                    </Text>
                  )}
                </View>
              </>
            )}
          </View>

          <View style={[styles.storeWrapper, stylesDynamic.contentWrapper]}>
            <View style={styles.storeTitle}>
              <Image
                accessibilityRole="image"
                source={{ uri: store?.image }}
                style={styles.image}
                accessibilityLabel={`avatar of ${store?.username} store`}
              />
              <Text fontWeight="normal" color="placeholder">
                {store?.username}
              </Text>
            </View>

            <View style={styles.button}>
              <Button color="secondary" textSize="xs">
                Follow
              </Button>
            </View>
          </View>

          <View style={[styles.description, stylesDynamic.contentWrapper]}>
            {isLoading ? (
              <Skeleton width="100%" height={100} borderRadius={4} />
            ) : (
              <Text
                fontWeight="light"
                color="placeholder"
                textStyle={{ lineHeight: lineHeights.md }}
              >
                {description} {description} {description} {description}
                {description} {description} {description} {description}
              </Text>
            )}
          </View>

          <View style={[styles.content, stylesDynamic.contentWrapper]}>
            <Text
              fontWeight="medium"
              fontSize="lg"
              textStyle={{ lineHeight: lineHeights.md }}
            >
              Details
            </Text>
            <View style={{ gap: spacing[2], paddingTop: spacing[5] }}>
              <ProductInformation isLoading={isLoading} data={productInfo} />
            </View>
          </View>

          <View style={[styles.content, stylesDynamic.contentWrapper]}>
            <Text
              fontWeight="medium"
              fontSize="lg"
              textStyle={{ lineHeight: lineHeights.md }}
            >
              Additional Details
            </Text>
            <ProductInformation
              isLoading={isLoading}
              data={productAdditional}
              style={{
                paddingTop: spacing[5],
              }}
            />
          </View>
        </Animated.ScrollView>
      </StickyFooter>
    );
  },
);

export const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: spacing['1.5'],
    paddingBottom: 100,
  },
  productWrapper: {
    paddingTop: spacing[4],
    paddingBottom: spacing['7.5'],
    paddingHorizontal: spacing[4],
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  storeWrapper: {
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeTitle: {
    gap: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    paddingVertical: 60,
    paddingHorizontal: spacing['7.5'],
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: spacing['7.5'],
  },
  textPrice: {
    marginLeft: 15,
    marginRight: 5,
    textDecorationLine: 'line-through',
  },
  loading: { marginTop: 10 },
  image: { width: 32, height: 32, borderRadius: radius.full },
  button: { height: 23 },
});
