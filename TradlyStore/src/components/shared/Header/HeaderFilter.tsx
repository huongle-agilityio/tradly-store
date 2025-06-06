import { memo } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

// Components
import { Button } from '@/components/common';

// Icons
import { CategoryIcon, LocationIcon, SortIcon } from '@/components/icons';

// Themes
import { spacing } from '@/themes';
import { useMedia } from '@/hooks';

interface HeaderFilterProps {
  style?: StyleProp<ViewStyle>;
}

export const HeaderFilter = memo(({ style }: HeaderFilterProps) => {
  const { colors } = useTheme();
  const { isSmallMobile } = useMedia();

  const listItems = [
    {
      icon: <SortIcon size={16} color={colors.light} />,
      label: 'Sort by',
    },
    {
      icon: <LocationIcon size={16} color={colors.light} />,
      label: 'Location',
    },
    {
      icon: <CategoryIcon size={16} color={colors.light} />,
      label: 'Category',
    },
  ];

  return (
    <View style={[styles.container, style]}>
      {listItems.map((item, index) => (
        <Button
          key={index}
          variant="bordered"
          color="secondary"
          icon={item.icon}
          {...(isSmallMobile && { size: 'small' })}
        >
          {item.label}
        </Button>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
  },
});
