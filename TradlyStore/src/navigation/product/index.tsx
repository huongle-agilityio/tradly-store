import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

// Screens
import { ProductDetail, ProductList } from '@/screens';
import { HeaderWithFilterButton, HeaderWithTitle } from '@/components/shared';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { ProductStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<ProductStackParamList>();

const HeaderProductList = ({ navigation, route }: NativeStackHeaderProps) => {
  const { name = '' } = (route.params ?? {}) as { name?: string };

  return <HeaderWithFilterButton navigation={navigation} title={name} />;
};

const HeaderAddProduct = ({ navigation }: NativeStackHeaderProps) => (
  <HeaderWithTitle navigation={navigation} title="Add Product" />
);

const HeaderEditProduct = ({ navigation }: NativeStackHeaderProps) => (
  <HeaderWithTitle navigation={navigation} title="Edit Product" />
);

export const ProductStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={SCREENS.PRODUCT_LIST}
      component={ProductList}
      options={{
        header: HeaderProductList,
      }}
    />
    <Stack.Screen
      name={SCREENS.EDIT_PRODUCT}
      getComponent={() => require('@/screens/product/EditProduct').EditProduct}
      options={{
        header: HeaderEditProduct,
      }}
    />
    <Stack.Screen
      name={SCREENS.ADD_PRODUCT}
      getComponent={() => require('@/screens/product/AddProduct').AddProduct}
      options={{
        header: HeaderAddProduct,
      }}
    />
    <Stack.Screen
      name={SCREENS.PRODUCT_DETAIL}
      component={ProductDetail}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
