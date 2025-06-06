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
import { Order, CartScreenProps } from '@/interfaces';

export const ShoppingCart = ({
  navigation,
}: CartScreenProps<typeof SCREENS.SHOPPING_CART>) => {
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
          navigation.navigate(SCREENS.ORDER, {
            screen: SCREENS.ORDER_SUCCESS,
            params: {
              carts: JSON.stringify(carts),
            },
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
    navigation.push(SCREENS.ORDER, { screen: SCREENS.ADDRESS });
  }, [navigation]);

  return (
    <Content
      isPending={isPending}
      onSubmit={handlePayment}
      onNavigateAddNewAddress={handleAddNewAddress}
    />
  );
};
