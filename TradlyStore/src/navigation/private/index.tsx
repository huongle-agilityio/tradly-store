import { useCallback } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

// Screens
import { ProductNavigation } from './product';
import { HeaderWithTitle } from '@/components/shared';
import { Address, OrderSuccess, ShoppingCart } from '@/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { PrivateStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<PrivateStackParamList>();

const HeaderStack = ({ navigation, options }: NativeStackHeaderProps) => (
  <HeaderWithTitle navigation={navigation} title={options.title || ''} />
);

const HeaderOrder = ({ navigation }: NativeStackHeaderProps) => {
  const handleClose = useCallback(() => {
    navigation.navigate(SCREENS.TABS, { screen: SCREENS.HOME });
  }, [navigation]);

  return <HeaderWithTitle onClose={handleClose} title="Order Details" />;
};

export const PrivateNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: HeaderStack,
      }}
    >
      <Stack.Screen
        name={SCREENS.CART}
        component={ShoppingCart}
        options={{ title: 'My Cart' }}
      />
      <Stack.Screen
        name={SCREENS.ADDRESS}
        component={Address}
        options={{
          title: 'Add a new address',
        }}
      />
      <Stack.Screen
        name={SCREENS.ORDER_SUCCESS}
        component={OrderSuccess}
        options={{
          header: HeaderOrder,
        }}
      />
      <Stack.Screen
        name={SCREENS.PRODUCT_STACK}
        component={ProductNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
