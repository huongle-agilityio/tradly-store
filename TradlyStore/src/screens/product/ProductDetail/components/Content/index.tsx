import { memo, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
} from 'react-native';

// Components
import { StickyFooter } from '@/components/shared';
import { ProductInformation } from '../ProductInformation';
import { Button, ProductCarousel, Skeleton, Text } from '@/components/common';

// Icons
import {
  ArrowLeftIcon,
  MenuDotIcon,
  OutlineHeartIcon,
  ShareIcon,
} from '@/components/icons';

// Interfaces
import { Store } from '@/interfaces';

// Themes
import { lineHeights, radius, spacing } from '@/themes';

// Utils
import { calculateDiscountedPrice, getProductDetails } from '@/utils';

interface ContentProps {
  isLoading: boolean;
  price: number;
  quantity: number;
  title: string;
  priceType: string;
  category: string;
  location: string;
  discount?: number;
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
          backgroundIcon: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: colors.backgroundSecondary,
            borderRadius: radius.full,
            opacity: 0.5,
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
          icon: {
            position: 'relative',
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: radius.full,
            backgroundColor: colors.backgroundOpacity,
            borderWidth: 1,
            borderColor: colors.light,
          },
        }),
      [colors],
    );

    return (
      <StickyFooter
        isLoading={isLoading}
        disabled={isSoldOut}
        buttonText="Add to Cart"
        onPress={handleAddToCart}
      >
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View>
            <View style={styles.headerWrapper}>
              <ProductCarousel images={slideImages} />

              <View style={styles.header}>
                <TouchableOpacity
                  accessibilityRole="button"
                  style={stylesDynamic.icon}
                  onPress={handleBack}
                >
                  <ArrowLeftIcon size={18} color={colors.light} />
                  <View style={stylesDynamic.backgroundIcon} />
                </TouchableOpacity>

                <View style={styles.iconWrapper}>
                  <View style={stylesDynamic.icon}>
                    <ShareIcon size={18} color={colors.light} />
                    <View style={stylesDynamic.backgroundIcon} />
                  </View>
                  <View style={stylesDynamic.icon}>
                    <OutlineHeartIcon size={18} color={colors.light} />
                    <View style={stylesDynamic.backgroundIcon} />
                  </View>
                  <View style={stylesDynamic.icon}>
                    <MenuDotIcon size={18} color={colors.light} />
                    <View style={stylesDynamic.backgroundIcon} />
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.productWrapper, stylesDynamic.contentWrapper]}>
              {isLoading ? (
                <View style={styles.loading}>
                  <Skeleton width="60%" height={20} borderRadius={4} />
                  <Skeleton width="40%" height={20} borderRadius={4} />
                </View>
              ) : (
                <>
                  <Text
                    color="placeholder"
                    fontSize="lg"
                    fontWeight="bold"
                    textStyle={{ lineHeight: lineHeights.md }}
                  >
                    {title}
                  </Text>
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
          </View>

          <View style={[styles.storeWrapper, stylesDynamic.contentWrapper]}>
            <View style={styles.storeTitle}>
              {isLoading ? (
                <>
                  <Skeleton width={32} height={32} style={styles.image} />
                  <Skeleton width={100} height={20} borderRadius={4} />
                </>
              ) : (
                <>
                  <Image
                    accessibilityRole="image"
                    source={{ uri: store?.image }}
                    style={styles.image}
                    accessibilityLabel={`avatar of ${store?.username} store`}
                  />
                  <Text fontWeight="normal" color="placeholder">
                    {store?.username}
                  </Text>
                </>
              )}
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
                {description}
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
        </ScrollView>
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
  header: {
    padding: spacing[4],
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    top: 0,
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
  headerWrapper: { height: 226, position: 'relative' },
  iconWrapper: { flexDirection: 'row', gap: 13 },
  loading: { gap: 10 },
  image: { width: 32, height: 32, borderRadius: radius.full },
  button: { height: 23 },
});
