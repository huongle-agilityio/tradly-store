import { useCallback } from 'react';
import { useAssets } from 'expo-asset';
import { ScrollView, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { orderSuccessStyles } from './styles';

// Components
import { TrackingOrder } from '@/ui/sections';
import { Button, CartItem, Image, Text } from '@/ui/components';

// Constants
import { IMAGE_DETAILS, SCREEN_ROUTES } from '@/constants';

// Interfaces
import { Cart } from '@/interfaces';

// Themes
import { DeliveryAddress } from './DeliveryAddress';

export const OrderSuccess = () => {
  const [assets] = useAssets([require('@/assets/success.png')]);
  const params = useLocalSearchParams();
  const carts: Cart[] = params.carts ? JSON.parse(params.carts as string) : [];

  const handleRedirectHome = useCallback(() => {
    router.navigate(SCREEN_ROUTES.HOME);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={orderSuccessStyles.contentContainerStyle}
    >
      <View style={orderSuccessStyles.imageWrapper}>
        {assets && (
          <Image
            source={assets[0]}
            alt={IMAGE_DETAILS.SUCCESS.alt}
            styles={{
              width: 160,
              height: 100,
            }}
          />
        )}
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
        buttonStyles={{ marginVertical: 16 }}
        onPress={handleRedirectHome}
      >
        Back to Home
      </Button>
    </ScrollView>
  );
};
