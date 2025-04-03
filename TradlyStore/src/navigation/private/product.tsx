import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

// Screens
import { HeaderWithFilterButton } from '@/ui/sections';
import { ProductCategory, ProductDetail } from '@/ui/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { ProductStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<ProductStackParamList>();

export const ProductNavigation = () => {
  const headerProductList = ({ navigation, route }: NativeStackHeaderProps) => {
    const { name = '' } = (route.params ?? {}) as { name?: string };

    return <HeaderWithFilterButton navigation={navigation} title={name} />;
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.PRODUCT_LIST}
        component={ProductCategory}
        options={{
          header: headerProductList,
        }}
      />
      <Stack.Screen name={SCREENS.PRODUCT_DETAIL} component={ProductDetail} />
    </Stack.Navigator>
  );
};
