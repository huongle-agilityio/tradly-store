import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { ProductNavigation } from './product';
import { Address, Cart, OrderSuccess } from '@/ui/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { PrivateStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const PrivateNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={SCREENS.CART} component={Cart} />
    <Stack.Screen name={SCREENS.ADDRESS} component={Address} />
    <Stack.Screen name={SCREENS.ORDER_SUCCESS} component={OrderSuccess} />
    <Stack.Screen name={SCREENS.PRODUCT_STACK} component={ProductNavigation} />
  </Stack.Navigator>
);
