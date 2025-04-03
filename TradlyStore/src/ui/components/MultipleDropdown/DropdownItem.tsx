import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { Text } from '../Text';

// Icons
import { CloseIcon } from '@/ui/icons';

// Interfaces
import { Option } from '@/interfaces';

// Themes
import { colors, fontsFamily, spacing } from '@/ui/themes';

interface DropdownItemProps {
  item: Option;
  unSelect?: (item: Option) => void;
}

export const DropdownItem = memo(({ item, unSelect }: DropdownItemProps) => {
  const handlePress = () => {
    unSelect && unSelect(item);
  };

  return (
    <TouchableOpacity testID="close-icon-option" onPress={handlePress}>
      <View style={styles.selectedStyle}>
        <Text style={styles.text}>{item.label}</Text>
        <CloseIcon size={9} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  text: {
    color: colors.secondary,
    fontFamily: fontsFamily.regular,
    lineHeight: spacing[6],
  },
  selectedStyle: {
    borderRadius: spacing[3],
    height: spacing[6],
    flexDirection: 'row',
    gap: spacing['2.5'],
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    backgroundColor: colors.select.badge,
    marginRight: spacing[3],
    marginBottom: spacing[3],
  },
});
