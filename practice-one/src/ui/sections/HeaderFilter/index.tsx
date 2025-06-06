import { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

// Components
import { Button } from '@/ui/components';

// Icons
import { CategoryIcon, LocationIcon, SortIcon } from '@/ui/icons';

// Themes
import { colors, spacing } from '@/ui/themes';

interface HeaderFilterProps {
  style?: StyleProp<ViewStyle>;
}

export const HeaderFilter = memo(({ style }: HeaderFilterProps) => (
  <View style={[styles.container, style]}>
    <Button
      variant="bordered"
      color="secondary"
      icon={<SortIcon size={16} color={colors.light} />}
    >
      Sort by
    </Button>
    <Button
      variant="bordered"
      color="secondary"
      icon={<LocationIcon size={16} color={colors.light} />}
    >
      Location
    </Button>
    <Button
      variant="bordered"
      color="secondary"
      icon={<CategoryIcon size={16} color={colors.light} />}
    >
      Category
    </Button>
  </View>
));

HeaderFilter.displayName = 'HeaderFilter';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing[2],
    paddingVertical: spacing[3],
  },
});
