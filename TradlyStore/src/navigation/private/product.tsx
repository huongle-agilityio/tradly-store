import { lazy } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

// Screens
import { ProductDetail } from '@/ui/screens';
import { HeaderWithFilterButton, HeaderWithTitle } from '@/ui/sections';

// HOCs
import { withSuspense } from '@/hocs';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { ProductStackParamList } from '@/interfaces';

const ProductCategory = lazy(() =>
  import('@/ui/screens/ProductCategory').then((module) => ({
    default: module.ProductCategory,
  })),
);

const FormCreateOrUpdateProduct = lazy(() =>
  import('@/ui/screens/FormCreateOrUpdateProduct').then((module) => ({
    default: module.FormCreateOrUpdateProduct,
  })),
);

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
        component={withSuspense(ProductCategory)}
        options={{
          header: headerProductList,
        }}
      />
      <Stack.Screen
        name={SCREENS.FORM_PRODUCT}
        component={withSuspense(FormCreateOrUpdateProduct)}
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
