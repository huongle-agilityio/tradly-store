import { useCallback } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

// Apis
import { useGetProductById } from '@/apis';

// Components
import { ListProductInfo } from '@/ui/sections';
import { Button, Image, ProductCarousel, Text } from '@/ui/components';

// Layouts
import { StickyFooterLayout } from '@/ui/layouts';

// Icons
import {
  ArrowLeftIcon,
  MenuDotIcon,
  OutlineHeartIcon,
  ShareIcon,
} from '@/ui/icons';

// Utils
import { calculateDiscountedPrice, getProductDetails } from '@/utils';

// Themes
import { colors, lineHeights, radius, spacing } from '@/ui/themes';

export const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = useGetProductById(id);
  const {
    slideImages = [],
    title = '',
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

  const handleAddToCart = useCallback(() => {}, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <StickyFooterLayout buttonText="Add to Cart" onPress={handleAddToCart}>
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
            </View>
          </View>
        </View>

        <View style={[styles.storeWrapper, styles.contentWrapper]}>
          <View style={styles.storeTitle}>
            <Image
              source={store.image}
              alt={`store-${store.name}-image`}
              styles={{ width: 32, height: 32, borderRadius: radius.full }}
            />
            <Text fontWeight="normal" color="placeholder">
              {store.name}
            </Text>
          </View>

          <View style={{ height: 23 }}>
            <Button textSize="xs">Follow</Button>
          </View>
        </View>

        <View style={[styles.description, styles.contentWrapper]}>
          <Text
            fontWeight="light"
            color="placeholder"
            textStyle={{ lineHeight: lineHeights.md }}
          >
            {description}
          </Text>
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
