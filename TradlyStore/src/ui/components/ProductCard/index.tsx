import { memo } from 'react';
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { getStyles, productActions } from './styles';
import FastImage from 'react-native-fast-image';

// Components
import { Text } from '../Text';

// Icons
import { EditIcon, TrashIcon } from '@/ui/icons';

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
  hasAction?: boolean;
  discount?: number;
  styleWrapper?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProductCard = memo(
  ({
    source,
    hasAction,
    title,
    storeName,
    storeSource,
    price,
    discount,
    styleWrapper,
    onEdit,
    onDelete,
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
        <View style={[styles.imageWrapper, styles.imageRadius]}>
          <FastImage
            style={[styles.image, styles.imageRadius]}
            testID="category-card-image"
            source={{
              uri: source,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          {hasAction && (
            <View style={productActions.container}>
              <TouchableOpacity style={productActions.icon} onPress={onEdit}>
                <EditIcon />
              </TouchableOpacity>
              <TouchableOpacity style={productActions.icon} onPress={onDelete}>
                <TrashIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>
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
              {!!discount && (
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
