import { useCallback } from 'react';

// Apis
import { useCreateOrder } from '@/apis';

// Components
import { Content } from './components/Content';

// Constants
import { ERROR_MESSAGES, SCREENS } from '@/constants';

// Stores
import { useCartStore, useToast } from '@/stores';

// Interfaces
import { Order, PrivateScreenProps } from '@/interfaces';

export const ShoppingCart = ({
  navigation,
}: PrivateScreenProps<typeof SCREENS.CART>) => {
  // Stores
  const showToast = useToast((state) => state.showToast);
  const [carts, clearCart] = useCartStore((state) => [
    state.carts,
    state.clearCart,
  ]);

  // Apis
  const { mutate, isPending } = useCreateOrder();

  const handlePayment = useCallback(
    (payload: Order) => {
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
    },
    [carts, clearCart, mutate, navigation, showToast],
  );

  const handleAddNewAddress = useCallback(() => {
    navigation.push(SCREENS.ADDRESS);
  }, [navigation]);

  return (
    <Content
      isPending={isPending}
      onSubmit={handlePayment}
      onNavigateAddNewAddress={handleAddNewAddress}
    />
  );
};
