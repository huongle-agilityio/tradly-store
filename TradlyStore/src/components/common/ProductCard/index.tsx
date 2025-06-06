import { memo, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// Components
import { Text } from '../Text';

// Icons
import { EditIcon, TrashIcon } from '@/components/icons';

// Themes
import { lineHeights, radius, spacing } from '@/themes';

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
    const { colors } = useTheme();
    const priceDiscount = calculateDiscountedPrice(price, discount);

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          container: {
            borderColor: colors.productCard.border,
          },
          imageWrapper: {
            backgroundColor: colors.opacity,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.productCard.border,
          },
          content: {
            backgroundColor: colors.productCard.background,
          },
          store: {
            width: discount ? 40 : 65,
          },
          icon: {
            width: 32,
            height: 32,
            borderRadius: radius.full,
            backgroundColor: colors.backgroundOpacity,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.light,
          },
        }),
      [colors, discount],
    );

    return (
      <TouchableOpacity
        accessibilityRole="button"
        testID="product-card"
        style={[styles.container, styleWrapper, stylesDynamic.container]}
        onPress={onPress}
      >
        <View style={[styles.imageRadius, stylesDynamic.imageWrapper]}>
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
              <TouchableOpacity
                accessibilityRole="button"
                style={stylesDynamic.icon}
                onPress={onEdit}
              >
                <EditIcon />
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="button"
                style={stylesDynamic.icon}
                onPress={onDelete}
              >
                <TrashIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={[styles.content, stylesDynamic.content]}>
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
                accessibilityRole="image"
                source={{ uri: storeSource }}
                alt={`store-${storeName}-logo`}
                style={styles.storeImage}
                accessibilityLabel={`avatar of ${storeName} store`}
              />
              <Text
                color="placeholder"
                textStyle={[styles.store, stylesDynamic.store]}
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

const styles = StyleSheet.create({
  container: {
    width: spacing[40],
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  imageRadius: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  image: {
    height: 125,
    position: 'relative',
    width: '100%',
  },
  storeImage: {
    width: spacing[5],
    height: spacing[5],
    borderRadius: radius.full,
  },
  content: {
    gap: spacing['3.5'],
    padding: spacing[3],
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['1.5'],
  },
  informationWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  store: {
    lineHeight: lineHeights.sm,
  },
  price: {
    textDecorationLine: 'line-through',
  },
});

const productActions = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 44,
  },
});
