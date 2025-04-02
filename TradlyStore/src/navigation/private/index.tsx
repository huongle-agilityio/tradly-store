import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

// Screens
import { ProductNavigation } from './product';
import { HeaderWithTitle } from '@/ui/sections';
import { Address, Cart, OrderSuccess } from '@/ui/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { PrivateStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const PrivateNavigation = () => {
  const headerStack = ({ navigation, options }: NativeStackHeaderProps) => (
    <HeaderWithTitle navigation={navigation} title={options.title || ''} />
  );

  const headerOrder = ({ navigation }: NativeStackHeaderProps) => {
    const handleClose = () => {
      navigation.navigate(SCREENS.HOME);
    };

    return (
      <HeaderWithTitle
        navigation={navigation}
        onClose={handleClose}
        title="Order Details"
      />
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        header: headerStack,
      }}
    >
      <Stack.Screen
        name={SCREENS.CART}
        component={Cart}
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
          header: headerOrder,
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
