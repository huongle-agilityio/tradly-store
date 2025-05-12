import { memo, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Components
import { Text } from '../Text';

interface OptionItemProps {
  isLastItem: boolean;
  value: string;
  label: string;
  selectedItems: string[] | string;
  onItemSelect: (value: string) => void;
}

export const OptionItem = memo(
  ({
    selectedItems,
    onItemSelect,
    isLastItem,
    value,
    label,
  }: OptionItemProps) => {
    const { colors } = useTheme();

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          selectedText: {
            color: colors.success,
          },
          borderCommon: {
            borderBottomColor: colors.input.borderSecondary,
          },
        }),
      [colors.success, colors.input.borderSecondary],
    );

    const handleSelect = () => {
      onItemSelect(value);
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
        testID="option-item"
        style={[
          styles.item,
          ...(!isLastItem
            ? [styles.borderCommon, stylesDynamic.borderCommon]
            : []),
        ]}
        onPress={handleSelect}
      >
        <Text textStyle={styles.itemText}>{label}</Text>

        {selectedItems.includes(value) && (
          <Text style={[styles.selectedText, stylesDynamic.selectedText]}>
            ✔
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
  },
  borderCommon: {
    borderBottomWidth: 1,
  },
});
