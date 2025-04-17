import { useCallback } from 'react';
import { Image, ScrollView, View, StyleSheet } from 'react-native';

// Components
import { Button, CartItem, Text } from '@/components/common';
import { TrackingOrder } from './components/TrackingOrder';
import { DeliveryAddress } from './components/DeliveryAddress';

// Constants
import { IMAGE_DETAILS, SCREENS } from '@/constants';

// Interfaces
import { Cart, PrivateScreenProps } from '@/interfaces';

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
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.imageWrapper}>
        <Image
          accessibilityRole="image"
          source={IMAGE_DETAILS.SUCCESS.src}
          alt={IMAGE_DETAILS.SUCCESS.alt}
          accessibilityLabel={IMAGE_DETAILS.SUCCESS.alt}
          style={styles.image}
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
        buttonStyles={styles.button}
        onPress={handleRedirectHome}
      >
        Back to Home
      </Button>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  contentContainerStyle: { paddingBottom: 50 },
  image: {
    width: 160,
    height: 100,
  },
  imageWrapper: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { marginVertical: 16 },
});
