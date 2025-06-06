import { useCallback } from 'react';
import { useTheme } from '@react-navigation/native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { Image, ScrollView, View, StyleSheet } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

// Components
import { Button, CartItem, Text } from '@/components/common';
import { TrackingOrder } from './components/TrackingOrder';
import { DeliveryAddress } from './components/DeliveryAddress';

// Constants
import { IMAGE_DETAILS, SCREENS } from '@/constants';

// Stores
import { useThemeStore } from '@/stores';

// Interfaces
import { Cart, OrderScreenProps } from '@/interfaces';

export const OrderSuccess = ({
  navigation,
  route: { params },
}: NativeStackHeaderProps & OrderScreenProps<typeof SCREENS.ORDER_SUCCESS>) => {
  const { colors } = useTheme();

  const isDark = useThemeStore((state) => state.isDark);
  const carts: Cart[] = params.carts ? JSON.parse(params.carts as string) : [];

  const handleRedirectHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: SCREENS.TABS,
          state: {
            index: 0,
            routes: [{ name: SCREENS.HOME }],
          },
        },
      ],
    });
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

      {carts.map(({ id, name, image, quantity, price, discount }, index) => {
        const isFirstItem = index === 0;
        const animation = isFirstItem
          ? SlideInLeft.delay(index * 500)
          : SlideInLeft.delay(index * 200);

        return (
          <Animated.View entering={animation}>
            <CartItem
              key={`cart-item-${id}`}
              id={id}
              name={name}
              image={image}
              quantity={quantity}
              price={price}
              discount={discount}
            />
          </Animated.View>
        );
      })}

      <TrackingOrder />

      <DeliveryAddress />

      <Button
        variant="ghost"
        textSize="lg"
        buttonStyles={styles.button}
        textStyles={{
          color: isDark ? colors.button.textSecondary : colors.text.default,
        }}
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
