import { memo, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

// Components
import { Text } from '../Text';
import { Dropdown } from '../Dropdown';

// Icons
import { ArrowDownIcon } from '@/components/icons';

// Stores
import { useThemeStore } from '@/stores';

// Mocks
import { CART_QUANTITY } from '@/mocks';

// Themes
import { spacing } from '@/themes';

// Utils
import { calculateDiscountedPrice } from '@/utils';

export interface CartItemProps {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  discount?: number;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantityItem?: (id: string, value: string) => void;
}

export const CartItem = memo(
  ({
    id,
    name,
    image,
    quantity,
    price,
    discount,
    onRemoveItem,
    onUpdateQuantityItem,
  }: CartItemProps) => {
    const { colors } = useTheme();
    const isDark = useThemeStore((state) => state.isDark);

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          gapContent: {
            gap: 15,
            ...(onRemoveItem
              ? { paddingBottom: spacing[3], paddingTop: spacing['7.5'] }
              : { paddingVertical: 25 }),
          },
          cartWrapper: {
            backgroundColor: colors.backgroundSecondary,
            elevation: 2,
          },
          buttonBorder: {
            borderTopColor: colors.productCard.border,
          },
        }),
      [colors, onRemoveItem],
    );

    const handleRemoveItem = () => {
      onRemoveItem?.(id);
    };

    const handleUpdateQuantity = (value: string) => {
      onUpdateQuantityItem?.(id, value);
    };

    return (
      <View style={stylesDynamic.cartWrapper}>
        <View style={[[styles.content, stylesDynamic.gapContent]]}>
          <Image
            source={{
              uri: image,
            }}
            accessibilityRole="image"
            accessibilityLabel={`image of ${name} product`}
            style={{
              width: spacing[30],
              height: spacing[30],
              borderRadius: spacing['2.5'],
            }}
          />

          <View style={styles.textWrapper}>
            <Text fontWeight="normal" color="placeholder">
              {name}
            </Text>

            <View style={styles.priceWrapper}>
              <Text fontWeight="bold" color="secondary" fontSize="lg">
                ${calculateDiscountedPrice(price, discount)}
              </Text>
              {!!discount && (
                <View style={styles.discountWrapper}>
                  <Text
                    fontWeight="normal"
                    color="placeholder"
                    textStyle={styles.discountText}
                  >
                    ${price}
                  </Text>
                  <Text fontWeight="normal" color="placeholder">
                    {discount}% off
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.quantityWrapper}>
              <Text fontSize="sm" fontWeight="normal" color="placeholder">
                Qty:
              </Text>
              <Dropdown
                options={CART_QUANTITY}
                value={quantity.toString()}
                disabled={!onUpdateQuantityItem}
                onChange={handleUpdateQuantity}
                renderRightIcon={
                  <ArrowDownIcon
                    size={10}
                    {...(isDark && { color: colors.input.textPlaceholder })}
                  />
                }
                style={{ width: 60 }}
              />
            </View>
          </View>
        </View>

        {onRemoveItem && (
          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.buttonWrapper, stylesDynamic.buttonBorder]}
            onPress={handleRemoveItem}
          >
            <Text fontWeight="normal" color="placeholder">
              Remove
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
  },
  textWrapper: {
    justifyContent: 'space-between',
    paddingTop: spacing['3.5'],
    paddingBottom: spacing['2.5'],
  },
  priceWrapper: { flexDirection: 'row', gap: spacing['3.5'] },
  quantityWrapper: { flexDirection: 'row', alignItems: 'center' },
  buttonWrapper: {
    width: '100%',
    paddingVertical: spacing[3],
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
  discountWrapper: { flexDirection: 'row', gap: 5 },
  discountText: {
    textDecorationLine: 'line-through',
  },
});
