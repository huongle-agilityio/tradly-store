import { useCallback } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

// Apis
import { useCreateOrder } from '@/apis';

// Components
import { PriceDetails, EmptyList } from '@/ui/sections';
import { Button, CartItem, Text } from '@/ui/components';

// Layouts
import { StickyFooterLayout } from '@/ui/layouts';

// Constants
import { ERROR_MESSAGES, SCREENS } from '@/constants';

// Stores
import { useCartStore, useToast } from '@/stores';

// Hooks
import { useAddressForm } from '@/hooks';

// Interfaces
import { Cart as CartType, PrivateScreenProps } from '@/interfaces';

// Utils
import { getTotalCarts, isEmptyObject } from '@/utils';

interface RenderItemProps {
  item: CartType;
}

export const Cart = ({
  navigation,
}: PrivateScreenProps<typeof SCREENS.CART>) => {
  // Stores
  const showToast = useToast((state) => state.showToast);
  const formAddress = useAddressForm((state) => state.form);
  const [carts, updateQuantityItem, removeCart, clearCart] = useCartStore(
    (state) => [
      state.carts,
      state.updateQuantityItem,
      state.removeCart,
      state.clearCart,
    ],
  );

  const { mutate, isPending } = useCreateOrder();

  const { username, city, state, zipCode, phone, streetAddress } = formAddress;
  const isDisabled = !carts?.length || isEmptyObject(formAddress);
  const { total, totalQuantity } = getTotalCarts(carts || []);

  const handleQuantityChange = useCallback(
    (id: string, value: string) => {
      updateQuantityItem(id, Number(value));
    },
    [updateQuantityItem],
  );

  const handlePayment = useCallback(() => {
    const payload = {
      username,
      phone,
      address: `${streetAddress}, ${city}, ${state}`,
      zipCode,
      total: total,
    };

    mutate(payload, {
      onSuccess: () => {
        showToast({
          description: 'Order successfully',
          variant: 'success',
        });
        navigation.navigate(SCREENS.ORDER_SUCCESS, {
          carts: JSON.stringify(carts),
        });
        clearCart();
      },
      onError: () => {
        showToast({
          description: ERROR_MESSAGES.DEFAULT_API_ERROR,
          variant: 'error',
        });
      },
    });
  }, [
    carts,
    city,
    clearCart,
    mutate,
    navigation,
    phone,
    showToast,
    state,
    streetAddress,
    total,
    username,
    zipCode,
  ]);

  const handleAddNewAddress = useCallback(() => {
    navigation.push(SCREENS.ADDRESS);
  }, [navigation]);

  const keyExtractor = useCallback((item: CartType) => item.id, []);

  const renderItem = useCallback(
    ({
      item: { id, name, image, quantity, price, discount },
    }: RenderItemProps) => (
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
    ),
    [handleQuantityChange, removeCart],
  );

  return (
    <StickyFooterLayout
      isLoading={isPending}
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
          <View style={styles.textDelivery}>
            <Text color="placeholder" numberOfLines={1}>
              Deliver to {username}, {zipCode}
            </Text>
            <Text color="placeholder" textStyle={styles.text} numberOfLines={1}>
              {city}, {state}
            </Text>
          </View>
          <Button
            textSize="xs"
            buttonStyles={styles.button}
            onPress={handleAddNewAddress}
          >
            Change
          </Button>
        </View>
      )}

      <FlatList
        data={carts}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<EmptyList text="Your cart is empty." />}
        renderItem={renderItem}
      />
    </StickyFooterLayout>
  );
};
