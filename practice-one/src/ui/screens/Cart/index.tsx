import { useCallback } from 'react';
import { Href, router } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { PriceDetails, EmptyList } from '@/ui/sections';
import { Button, CartItem, Text } from '@/ui/components';

// Layouts
import { StickyFooterLayout } from '@/ui/layouts';

// Constants
import { SCREEN_ROUTES } from '@/constants';

// Stores
import { useCartStore } from '@/stores';

// Hooks
import { useAddressForm } from '@/hooks';

// Themes
import { colors, spacing } from '@/ui/themes';

// Utils
import { getTotalCarts, isEmptyObject } from '@/utils';

export const Cart = () => {
  // Stores
  const formAddress = useAddressForm((state) => state.form);
  const [carts, updateQuantityItem, removeCart] = useCartStore((state) => [
    state.carts,
    state.updateQuantityItem,
    state.removeCart,
  ]);

  const { username, city, state, zipCode } = formAddress;
  const isDisabled = !carts?.length || isEmptyObject(formAddress);
  const { total, totalQuantity } = getTotalCarts(carts || []);

  const handleQuantityChange = (id: string, value: string) => {
    updateQuantityItem(id, Number(value));
  };

  const handlePayment = useCallback(() => {
    // TODO: Payment
  }, []);

  const handleAddNewAddress = () => {
    router.push(SCREEN_ROUTES.ADDRESS as Href);
  };

  return (
    <StickyFooterLayout
      disabled={isDisabled}
      content={<PriceDetails total={total} totalQuantity={totalQuantity} />}
      buttonText="Continue to Payment"
      onPress={handlePayment}
    >
      {isEmptyObject(formAddress) ? (
        <TouchableOpacity
          style={styles.buttonAddressWrapper}
          onPress={handleAddNewAddress}
        >
          <Text fontWeight="normal" color="placeholder">
            + Add New Address
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.addressWrapper}>
          <View style={{ gap: spacing[1.5], width: '70%' }}>
            <Text color="placeholder" numberOfLines={1}>
              Deliver to {username}, {zipCode}
            </Text>
            <Text
              color="placeholder"
              textStyle={{ opacity: 0.7 }}
              numberOfLines={1}
            >
              {city}, {state}
            </Text>
          </View>
          <Button
            textSize="xs"
            buttonStyles={{
              width: 94,
              height: 23,
            }}
            onPress={handleAddNewAddress}
          >
            Change
          </Button>
        </View>
      )}

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
  addressWrapper: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light,
  },
});
