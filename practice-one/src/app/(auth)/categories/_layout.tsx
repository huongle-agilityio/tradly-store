import { Stack } from 'expo-router';

// Components
import { HeaderWithFilterButton } from '@/ui/sections';

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
  <Stack screenOptions={{ headerStyle: { backgroundColor: colors.primary } }}>
    <Stack.Screen
      name="index"
      options={{
        header: ({ route }: HeaderProps) => (
          <HeaderWithFilterButton title={route?.params?.name || ''} />
        ),
      }}
    />
  </Stack>
);

export default LayoutWithSearch;
