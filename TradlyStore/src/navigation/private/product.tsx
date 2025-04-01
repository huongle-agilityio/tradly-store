import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { HeaderWithFilterButton } from '@/ui/sections';
import { ProductCategory, ProductDetail } from '@/ui/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { ProductStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<ProductStackParamList>();

export const ProductNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={SCREENS.PRODUCT_LIST}
        component={ProductCategory}
        options={{
          header: ({ navigation }) => {
            const handleBack = () => {
              navigation.goBack();
            };

            const handleClose = () => {
              navigation.navigate(SCREENS.HOME);
            };

            return (
              <HeaderWithFilterButton
                title="Test"
                onBack={handleBack}
                onClose={handleClose}
              />
            );
          },
        }}
      />
      <Stack.Screen name={SCREENS.PRODUCT_DETAIL} component={ProductDetail} />
    </Stack.Navigator>
  );
};
