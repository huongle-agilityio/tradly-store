import { Stack } from 'expo-router';

// Components
import { HeaderWithFilterButton, HeaderWithTitle } from '@/ui/sections';

// Constants
import { SCREEN_NAME, SCREEN_ROUTES } from '@/constants';

// Themes
import { colors } from '@/ui/themes';

interface HeaderProps {
  route: {
    params?: {
      name?: string;
    };
  };
}

const LayoutWithSearch = () => (
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

export default LayoutWithSearch;
