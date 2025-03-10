import { Stack } from 'expo-router';

// Components
import { HeaderWithFilterButton, HeaderWithTitle } from '@/ui/sections';

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
    <Stack.Screen name="products/[id]/index" options={{ headerShown: false }} />
    <Stack.Screen
      name="cart/index"
      options={{
        header: () => <HeaderWithTitle hasBackButton title="My Cart" />,
      }}
    />
  </Stack>
);

export default LayoutWithSearch;
