import { View } from 'react-native';

// Components
import { Input, Text } from '@/ui/components';

// Icons
import { CartIcon, HeartIcon, SearchIcon } from '@/ui/icons';

// Themes
import { colors, spacing } from '@/ui/themes';

interface HeaderWithSearchInputProps {
  title: string;
}

export const HeaderWithSearchInput = ({
  title,
}: HeaderWithSearchInputProps) => (
  <View style={{ gap: 23 }}>
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text fontSize="xxl" fontWeight="bold" color="light">
        {title}
      </Text>
      <View style={{ flexDirection: 'row', gap: spacing[5] }}>
        <HeartIcon size={24} color={colors.light} />
        <CartIcon size={24} color={colors.light} />
      </View>
    </View>

    <Input
      variant="outlined"
      placeholder="Search Product"
      onChangeText={() => {}}
      value=""
      editable={false}
      icon={<SearchIcon size={24} color={colors.primary} />}
    />
  </View>
);
