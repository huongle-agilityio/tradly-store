import { Redirect, Stack } from 'expo-router';

// Components
import { HeaderWithFilterButton, HeaderWithTitle } from '@/ui/sections';

// Constants
import { SCREEN_NAME, SCREEN_ROUTES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

// Themes
import { colors } from '@/ui/themes';

interface HeaderProps {
  route: {
    params?: {
      name?: string;
    };
  };
}

const PrivateLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href={SCREEN_ROUTES.LOGIN} />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        header: ({ route }: HeaderProps) => (
          <HeaderWithFilterButton
            hasBackButton
            title={route?.params?.name || ''}
          />
        ),
      }}
    >
      <Stack.Screen name={SCREEN_NAME.TABS} options={{ headerShown: false }} />
      <Stack.Screen
        name={SCREEN_NAME.PRODUCT_DETAIL}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAME.CART}
        options={{
          header: () => <HeaderWithTitle hasBackButton title="My Cart" />,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.ADDRESS}
        options={{
          header: () => (
            <HeaderWithTitle hasBackButton title="Add a new address" />
          ),
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.ORDER_SUCCESS}
        options={{
          header: () => (
            <HeaderWithTitle
              redirectTo={SCREEN_ROUTES.HOME}
              title="Order Details"
            />
          ),
        }}
      />
    </Stack>
  );
};

export default PrivateLayout;
