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
  <Stack
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      header: ({ route }: HeaderProps) => (
        <HeaderWithFilterButton title={route?.params?.name || ''} />
      ),
    }}
  />
);

export default LayoutWithSearch;
