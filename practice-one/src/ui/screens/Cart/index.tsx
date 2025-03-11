import { useCallback } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Components
import { PriceDetails, EmptyList } from '@/ui/sections';
import { CartItem, Text } from '@/ui/components';

// Layouts
import { StickyFooterLayout } from '@/ui/layouts';

// Stores
import { useCartStore } from '@/stores';

// Themes
import { colors, spacing } from '@/ui/themes';

// Utils
import { getTotalCarts } from '@/utils';

export const Cart = () => {
  // Stores
  const [carts, updateQuantityItem, removeCart] = useCartStore((state) => [
    state.carts,
    state.updateQuantityItem,
    state.removeCart,
  ]);
  const { total, totalQuantity } = getTotalCarts(carts);

  const handleQuantityChange = (id: string, value: string) => {
    updateQuantityItem(id, Number(value));
  };

  const handlePayment = useCallback(() => {
    // TODO: Payment
  }, []);

  const handleAddNewAddress = () => {
    // TODO: Add new address
  };

  return (
    <StickyFooterLayout
      content={<PriceDetails total={total} totalQuantity={totalQuantity} />}
      buttonText="Continue to Payment"
      onPress={handlePayment}
    >
      <TouchableOpacity
        style={styles.buttonAddressWrapper}
        onPress={handleAddNewAddress}
      >
        <Text fontWeight="normal" color="placeholder">
          + Add New Address
        </Text>
      </TouchableOpacity>

      <FlatList
        data={carts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<EmptyList text="Your cart is empty." />}
        renderItem={({
          item: { id, name, image, quantity, price, discount },
        }) => (
          <CartItem
            key={id}
            id={id}
            name={name}
            image={image}
            quantity={quantity}
            price={price}
            discount={discount}
            onRemoveItem={removeCart}
            onUpdateQuantityItem={handleQuantityChange}
          />
        )}
      />
    </StickyFooterLayout>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: spacing['2.5'],
    paddingTop: spacing['2.5'],
    paddingBottom: spacing[7],
  },
  buttonAddressWrapper: {
    width: '100%',
    paddingVertical: spacing['4.5'],
    alignItems: 'center',
    backgroundColor: colors.light,
  },
});
