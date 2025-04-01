import { memo } from 'react';
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { getStyles } from './styles';

// Components
import { Text } from '../Text';

// Themes
import { lineHeights } from '@/ui/themes';

// Utils
import { calculateDiscountedPrice } from '@/utils';

interface ProductCardProps {
  source: string;
  title: string;
  storeName: string;
  storeSource: string;
  price: number;
  discount?: number;
  styleWrapper?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const ProductCard = memo(
  ({
    source,
    title,
    storeName,
    storeSource,
    price,
    discount,
    styleWrapper,
    onPress,
  }: ProductCardProps) => {
    const styles = getStyles(discount);
    const priceDiscount = calculateDiscountedPrice(price, discount);

    return (
      <TouchableOpacity
        testID="product-card"
        style={[styles.container, styleWrapper]}
        onPress={onPress}
      >
        <Image
          source={{ uri: source }}
          testID="category-card-image"
          alt={`product-${title}`}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text
            color="tertiary"
            textStyle={{ lineHeight: lineHeights.sm }}
            numberOfLines={1}
          >
            {title}
          </Text>

          <View style={styles.informationWrapper}>
            <View style={styles.textWrapper}>
              <Image
                source={{ uri: storeSource }}
                alt={`store-${storeName}-logo`}
                style={styles.storeImage}
              />
              <Text
                color="placeholder"
                textStyle={styles.store}
                numberOfLines={1}
              >
                {storeName}
              </Text>
            </View>

            <View style={styles.textWrapper}>
              {discount && (
                <Text
                  fontSize="xxs"
                  color="placeholder"
                  textStyle={styles.price}
                >
                  ${price}
                </Text>
              )}
              <Text color="secondary">${priceDiscount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

ProductCard.displayName = 'ProductCard';
