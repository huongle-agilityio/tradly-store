import { useCallback } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { orderSuccessStyles } from './styles';

// Components
import { TrackingOrder } from '@/ui/sections';
import { Button, CartItem, Text } from '@/ui/components';

// Constants
import { IMAGE_DETAILS, SCREENS } from '@/constants';

// Interfaces
import { Cart, PrivateScreenProps } from '@/interfaces';

// Themes
import { DeliveryAddress } from './DeliveryAddress';

type OrderSuccessProps = PrivateScreenProps<typeof SCREENS.ORDER_SUCCESS>;

export const OrderSuccess = ({
  navigation,
  route: { params },
}: OrderSuccessProps) => {
  const carts: Cart[] = params.carts ? JSON.parse(params.carts as string) : [];

  const handleRedirectHome = useCallback(() => {
    navigation.navigate(SCREENS.TABS, { screen: SCREENS.HOME });
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={orderSuccessStyles.contentContainerStyle}
    >
      <View style={orderSuccessStyles.imageWrapper}>
        <Image
          accessibilityRole="image"
          source={IMAGE_DETAILS.SUCCESS.src}
          alt={IMAGE_DETAILS.SUCCESS.alt}
          accessibilityLabel={IMAGE_DETAILS.SUCCESS.alt}
          style={orderSuccessStyles.image}
        />
        <Text fontWeight="bold" fontSize="xxl" color="placeholder">
          Thanks for Order
        </Text>
      </View>

      {carts.map(({ id, name, image, quantity, price, discount }) => (
        <CartItem
          key={`cart-item-${id}`}
          id={id}
          name={name}
          image={image}
          quantity={quantity}
          price={price}
          discount={discount}
        />
      ))}

      <TrackingOrder />

      <DeliveryAddress />

      <Button
        variant="ghost"
        color="dark"
        textSize="lg"
        buttonStyles={orderSuccessStyles.button}
        onPress={handleRedirectHome}
      >
        Back to Home
      </Button>
    </ScrollView>
  );
};
