import { useCallback } from 'react';
import { CommonActions } from '@react-navigation/native';
import { ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { styles } from './styles';

// Apis
import { useGetProductById } from '@/apis';

// Components
import { ListProductInfo } from '@/ui/sections';
import { Button, ProductCarousel, Skeleton, Text } from '@/ui/components';

// Layouts
import { StickyFooterLayout } from '@/ui/layouts';

// Icons
import {
  ArrowLeftIcon,
  MenuDotIcon,
  OutlineHeartIcon,
  ShareIcon,
} from '@/ui/icons';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { ProductScreenProps } from '@/interfaces';

// Stores
import { useCartStore, useToast } from '@/stores';

// Themes
import { colors, lineHeights, spacing } from '@/ui/themes';

// Utils
import { calculateDiscountedPrice, getProductDetails } from '@/utils';

export const ProductDetail = ({
  navigation,
  route,
}: ProductScreenProps<typeof SCREENS.PRODUCT_DETAIL>) => {
  const { id } = route.params;

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
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: SCREENS.TABS, params: { screen: SCREENS.HOME } }],
        }),
      );
    }
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
          <View style={styles.headerWrapper}>
            <ProductCarousel images={slideImages} name={title} />

            <View style={styles.header}>
              <TouchableOpacity style={styles.icon} onPress={handleBack}>
                <ArrowLeftIcon size={18} color={colors.light} />
                <View style={styles.backgroundIcon} />
              </TouchableOpacity>

              <View style={styles.iconWrapper}>
                <View style={styles.icon}>
                  <ShareIcon size={18} color={colors.light} />
                  <View style={styles.backgroundIcon} />
                </View>
                <View style={styles.icon}>
                  <OutlineHeartIcon size={18} color={colors.light} />
                  <View style={styles.backgroundIcon} />
                </View>
                <View style={styles.icon}>
                  <MenuDotIcon size={18} color={colors.light} />
                  <View style={styles.backgroundIcon} />
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.productWrapper, styles.contentWrapper]}>
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
                  {discount && (
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
                    <Text color="light" textStyle={styles.banner}>
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
              source={{ uri: store.image }}
              alt={`store-${store.name}-image`}
              style={styles.image}
            />
            {isLoading ? (
              <Skeleton width={100} height={20} borderRadius={4} />
            ) : (
              <Text fontWeight="normal" color="placeholder">
                {store.name}
              </Text>
            )}
          </View>

          <View style={styles.button}>
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
