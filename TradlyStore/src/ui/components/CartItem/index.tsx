import { memo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { getStyles } from './styles';

// Components
import { Text } from '../Text';
import { Dropdown } from '../Dropdown';

// Mocks
import { CART_QUANTITY } from '@/mocks';

// Themes
import { spacing } from '@/ui/themes';

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
    const styles = getStyles(!!onRemoveItem);

    const handleRemoveItem = () => {
      onRemoveItem?.(id);
    };

    const handleUpdateQuantity = (value: string) => {
      onUpdateQuantityItem?.(id, value);
    };

    return (
      <View style={styles.cartWrapper}>
        <View style={styles.content}>
          <Image
            source={{
              uri: image,
            }}
            alt={`image of ${name} product`}
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
                items={CART_QUANTITY}
                value={quantity.toString()}
                disabled={!onUpdateQuantityItem}
                onValueChange={handleUpdateQuantity}
                style={{
                  inputAndroid: {
                    width: 80,
                  },
                }}
              />
            </View>
          </View>
        </View>

        {onRemoveItem && (
          <TouchableOpacity
            style={styles.buttonWrapper}
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

CartItem.displayName = 'CartItem';
