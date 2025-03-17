import { useCallback } from 'react';
import { Href, router } from 'expo-router';
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
import { ERROR_MESSAGES, SCREEN_ROUTES } from '@/constants';

// Stores
import { useCartStore, useToast } from '@/stores';

// Hooks
import { useAddressForm } from '@/hooks';

// Themes
import { spacing } from '@/ui/themes';

// Interfaces
import { Cart as CartType } from '@/interfaces';

// Utils
import { getTotalCarts, isEmptyObject } from '@/utils';

export const Cart = () => {
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
        router.replace({
          pathname: SCREEN_ROUTES.ORDER_SUCCESS,
          params: { carts: JSON.stringify(carts) },
        } as unknown as Href);
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
    phone,
    showToast,
    state,
    streetAddress,
    total,
    username,
    zipCode,
  ]);

  const handleAddNewAddress = () => {
    router.push(SCREEN_ROUTES.ADDRESS as Href);
  };

  const keyExtractor = useCallback((item: CartType) => item.id, []);

  const renderItem = useCallback(
    ({
      item: { id, name, image, quantity, price, discount },
    }: {
      item: CartType;
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
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<EmptyList text="Your cart is empty." />}
        renderItem={renderItem}
      />
    </StickyFooterLayout>
  );
};
