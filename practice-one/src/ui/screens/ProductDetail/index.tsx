import { useCallback } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

// Apis
import { useGetProductById } from '@/apis';

// Components
import { ListProductInfo } from '@/ui/sections';
import {
  Button,
  Image,
  ProductCarousel,
  Skeleton,
  Text,
} from '@/ui/components';

// Layouts
import { StickyFooterLayout } from '@/ui/layouts';

// Icons
import {
  ArrowLeftIcon,
  MenuDotIcon,
  OutlineHeartIcon,
  ShareIcon,
} from '@/ui/icons';

// Stores
import { useCartStore, useToast } from '@/stores';

// Themes
import { colors, lineHeights, radius, spacing } from '@/ui/themes';

// Utils
import { calculateDiscountedPrice, getProductDetails } from '@/utils';

export const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Stores
  const showToast = useToast((state) => state.showToast);
  const addNewCart = useCartStore((state) => state.addNewCart);

  // Apis
  const { data, isLoading } = useGetProductById(id);
  const {
    documentId = '',
    slideImages = [],
    image = '',
    title = '',
    quantity = 0,
    price = 0,
    description,
    store = { image: '', name: '' },
    discount,
    priceType = '',
    location = '',
    category = '',
  } = data || {};

  const productInfo = getProductDetails({ priceType, category, location });
  const productAdditional = [
    {
      title: 'Delivery Details',
      value: 'Home Delivery Available, Cash On Delivery',
    },
  ];
  const isSoldOut = quantity <= 0;

  const handleAddToCart = useCallback(() => {
    addNewCart({
      id: documentId,
      name: title,
      image,
      price,
      discount,
      quantity: 1,
    });
    showToast({ description: 'Added to cart', variant: 'success' });
  }, [addNewCart, discount, documentId, image, price, showToast, title]);

  const handleBack = () => {
    router.back();
  };

  return (
    <StickyFooterLayout
      isLoading={isLoading}
      disabled={isSoldOut}
      buttonText="Add to Cart"
      onPress={handleAddToCart}
    >
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <View style={{ height: 226, position: 'relative' }}>
            <ProductCarousel images={slideImages} name={title} />

            <View style={styles.header}>
              <TouchableOpacity style={styles.iconWrapper} onPress={handleBack}>
                <ArrowLeftIcon size={18} color={colors.light} />
                <View style={styles.backgroundIcon} />
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', gap: 13 }}>
                <View style={styles.iconWrapper}>
                  <ShareIcon size={18} color={colors.light} />
                  <View style={styles.backgroundIcon} />
                </View>
                <View style={styles.iconWrapper}>
                  <OutlineHeartIcon size={18} color={colors.light} />
                  <View style={styles.backgroundIcon} />
                </View>
                <View style={styles.iconWrapper}>
                  <MenuDotIcon size={18} color={colors.light} />
                  <View style={styles.backgroundIcon} />
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.productWrapper, styles.contentWrapper]}>
            {isLoading ? (
              <View style={{ gap: 10 }}>
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
                  {discount && (
                    <>
                      <Text
                        fontWeight="normal"
                        color="placeholder"
                        textStyle={{
                          marginLeft: 15,
                          marginRight: 5,
                          textDecorationLine: 'line-through',
                        }}
                      >
                        ${price}
                      </Text>
                      <Text fontWeight="normal" color="placeholder">
                        {discount}% off
                      </Text>
                    </>
                  )}
                  {isSoldOut && (
                    <Text
                      color="light"
                      textStyle={{
                        marginLeft: 10,
                        backgroundColor: colors.error,
                        borderRadius: 8,
                        paddingVertical: 2,
                        paddingHorizontal: 6,
                      }}
                    >
                      SOLD OUT
                    </Text>
                  )}
                </View>
              </>
            )}
          </View>
        </View>

        <View style={[styles.storeWrapper, styles.contentWrapper]}>
          <View style={styles.storeTitle}>
            <Image
              source={store.image}
              alt={`store-${store.name}-image`}
              styles={{ width: 32, height: 32, borderRadius: radius.full }}
            />
            {isLoading ? (
              <Skeleton width={100} height={20} borderRadius={4} />
            ) : (
              <Text fontWeight="normal" color="placeholder">
                {store.name}
              </Text>
            )}
          </View>

          <View style={{ height: 23 }}>
            <Button textSize="xs">Follow</Button>
          </View>
        </View>

        <View style={[styles.description, styles.contentWrapper]}>
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

        <View style={[styles.content, styles.contentWrapper]}>
          <Text
            fontWeight="medium"
            fontSize="lg"
            textStyle={{ lineHeight: lineHeights.md }}
          >
            Details
          </Text>
          <View style={{ gap: spacing[2], paddingTop: spacing[5] }}>
            <ListProductInfo data={productInfo} />
          </View>
        </View>

        <View style={[styles.content, styles.contentWrapper]}>
          <Text
            fontWeight="medium"
            fontSize="lg"
            textStyle={{ lineHeight: lineHeights.md }}
          >
            Additional Details
          </Text>
          <ListProductInfo
            data={productAdditional}
            style={{
              paddingTop: spacing[5],
            }}
          />
        </View>
      </ScrollView>
    </StickyFooterLayout>
  );
};
