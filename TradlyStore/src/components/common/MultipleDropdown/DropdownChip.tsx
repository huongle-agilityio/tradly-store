import { memo, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
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
import { CloseIcon } from '@/components/icons';

// Themes
import { fontsFamily, spacing } from '@/themes';

interface DropdownChipProps {
  value: string;
  label: string;
  style?: StyleProp<ViewStyle>;
  onRemove?: (value: string) => void;
}

export const DropdownChip = memo(
  ({ value, label, style, onRemove }: DropdownChipProps) => {
    const { colors } = useTheme();
    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          text: {
            color: colors.secondary,
          },
          selectedStyle: {
            backgroundColor: colors.select.badge,
          },
        }),
      [colors.secondary, colors.select.badge],
    );

    const handlePress = () => {
      onRemove?.(value);
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
        testID="close-icon-option"
        onPress={handlePress}
        style={style}
      >
        <View style={[styles.selectedStyle, stylesDynamic.selectedStyle]}>
          <Text style={[styles.text, stylesDynamic.text]}>{label}</Text>
          <CloseIcon size={9} />
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  text: {
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
    marginRight: spacing[3],
    marginBottom: spacing[3],
  },
});
