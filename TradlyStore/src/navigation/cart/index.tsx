import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

// Screens
import { HeaderWithTitle } from '@/components/shared';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { CartStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<CartStackParamList>();

const HeaderStack = ({ navigation, options }: NativeStackHeaderProps) => (
  <HeaderWithTitle navigation={navigation} title={options.title || ''} />
);

export const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: HeaderStack,
      }}
    >
      <Stack.Screen
        name={SCREENS.SHOPPING_CART}
        getComponent={() => require('@/screens/cart/ShoppingCart').ShoppingCart}
        options={{ title: 'My Cart' }}
      />
    </Stack.Navigator>
  );
};
