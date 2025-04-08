import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

// Screens
import { HeaderWithFilterButton, HeaderWithTitle } from '@/ui/sections';
import {
  FormCreateOrUpdateProduct,
  ProductCategory,
  ProductDetail,
} from '@/ui/screens';

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

  const headerStack = ({ navigation, route }: NativeStackHeaderProps) => {
    const { title } = (route.params ?? {}) as { title?: string };

    return <HeaderWithTitle navigation={navigation} title={title || ''} />;
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
      <Stack.Screen
        name={SCREENS.FORM_PRODUCT}
        component={FormCreateOrUpdateProduct}
        options={{
          header: headerStack,
        }}
      />
      <Stack.Screen
        name={SCREENS.PRODUCT_DETAIL}
        component={ProductDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
