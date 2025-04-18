import { useCallback } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

// Screens
import { HeaderWithTitle } from '@/components/shared';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { OrderStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<OrderStackParamList>();

const HeaderStack = ({ navigation, options }: NativeStackHeaderProps) => (
  <HeaderWithTitle navigation={navigation} title={options.title || ''} />
);

const HeaderOrder = ({ navigation }: NativeStackHeaderProps) => {
  const handleClose = useCallback(() => {
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

  return <HeaderWithTitle onClose={handleClose} title="Order Details" />;
};

export const OrderStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: HeaderStack,
    }}
  >
    <Stack.Screen
      name={SCREENS.ADDRESS}
      getComponent={() => require('@/screens/order/Address').Address}
      options={{
        title: 'Add a new address',
      }}
    />
    <Stack.Screen
      name={SCREENS.ORDER_SUCCESS}
      getComponent={() => require('@/screens/order/OrderSuccess').OrderSuccess}
      options={{
        header: HeaderOrder,
      }}
    />
  </Stack.Navigator>
);
