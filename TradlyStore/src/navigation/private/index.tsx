import { lazy } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

// Screens
import { ProductNavigation } from './product';
import { HeaderWithTitle } from '@/ui/sections';

// Constants
import { SCREENS } from '@/constants';

// HOCs
import { withSuspense } from '@/hocs';

// Interfaces
import { PrivateStackParamList } from '@/interfaces';

const Cart = lazy(() =>
  import('@/ui/screens/Cart').then((module) => ({
    default: module.Cart,
  })),
);

const Address = lazy(() =>
  import('@/ui/screens/Address').then((module) => ({
    default: module.Address,
  })),
);

const OrderSuccess = lazy(() =>
  import('@/ui/screens/Order/OrderSuccess').then((module) => ({
    default: module.OrderSuccess,
  })),
);

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const PrivateNavigation = () => {
  const headerStack = ({ navigation, options }: NativeStackHeaderProps) => (
    <HeaderWithTitle navigation={navigation} title={options.title || ''} />
  );

  const headerOrder = ({ navigation }: NativeStackHeaderProps) => {
    const handleClose = () => {
      navigation.navigate(SCREENS.TABS, { screen: SCREENS.HOME });
    };

    return <HeaderWithTitle onClose={handleClose} title="Order Details" />;
  };

  return (
    <Stack.Navigator
      screenOptions={{
        header: headerStack,
      }}
    >
      <Stack.Screen
        name={SCREENS.CART}
        component={withSuspense(Cart)}
        options={{ title: 'My Cart' }}
      />
      <Stack.Screen
        name={SCREENS.ADDRESS}
        component={withSuspense(Address)}
        options={{
          title: 'Add a new address',
        }}
      />
      <Stack.Screen
        name={SCREENS.ORDER_SUCCESS}
        component={withSuspense(OrderSuccess)}
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
