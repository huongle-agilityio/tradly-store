import { memo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// Components
import { Text } from '../Text';

// Icons
import { CloseIcon } from '@/ui/icons';

// Themes
import { colors, fontsFamily, spacing } from '@/ui/themes';

interface DropdownChipProps {
  value: string;
  label: string;
  style?: StyleProp<ViewStyle>;
  onRemove?: (value: string) => void;
}

export const DropdownChip = memo(
  ({ value, label, style, onRemove }: DropdownChipProps) => {
    const handlePress = () => {
      onRemove?.(value);
    };

    return (
      <TouchableOpacity
        testID="close-icon-option"
        onPress={handlePress}
        style={style}
      >
        <View style={styles.selectedStyle}>
          <Text style={styles.text}>{label}</Text>
          <CloseIcon size={9} />
        </View>
      </TouchableOpacity>
    );
  },
);

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
