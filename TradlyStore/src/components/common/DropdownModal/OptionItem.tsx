import { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Components
import { Text } from '../Text';

// Themes
import { colors } from '@/themes';

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
    const handleSelect = () => {
      onItemSelect(value);
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
        testID="option-item"
        style={[styles.item, !isLastItem && styles.borderCommon]}
        onPress={handleSelect}
      >
        <Text style={styles.itemText}>{label}</Text>

        {selectedItems.includes(value) && (
          <Text style={styles.selectedText}>✔</Text>
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
    color: colors.success,
  },
  borderCommon: {
    borderBottomWidth: 1,
    borderBottomColor: colors.input.borderSecondary,
  },
});
