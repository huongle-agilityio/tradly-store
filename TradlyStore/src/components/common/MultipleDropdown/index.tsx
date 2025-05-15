import { lazy, Suspense, useCallback, useMemo, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';

// Components
import { Text } from '../Text';
import { Input } from '../Input';
import { DropdownChip } from './DropdownChip';

// Interfaces
import { Option } from '@/interfaces';

// Themes
import { spacing } from '@/themes';

const MultipleSelectSheet = lazy(() =>
  import('../DropdownModal/MultipleSelectSheet').then((module) => ({
    default: module.MultipleSelectSheet,
  })),
);

interface SelectWithChipsProps {
  label: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  options: Option[];
  selectedItems: string[];
  onChange: (value: string[]) => void;
}

export const MultipleDropdown = ({
  label,
  options,
  placeholder,
  selectedItems,
  error,
  onChange,
  disabled,
}: SelectWithChipsProps) => {
  const sheetRef = useRef<BottomSheet>(null);
  const { colors } = useTheme();
  const stylesDynamic = useMemo(
    () =>
      StyleSheet.create({
        borderCommon: {
          borderBottomColor: colors.input.borderSecondary,
        },
      }),
    [colors.input.borderSecondary],
  );

  /**
   * Handles the selection of an item in the dropdown list. If the item is
   * already selected, it will be removed from the selectedItems state array.
   * If the item is not selected, it will be added to the selectedItems state
   * array.
   * @param {number} itemId The value of the item selected.
   */
  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      const newItems = selectedItems.filter((value) => value !== itemId);
      onChange(newItems);
    } else {
      onChange([...selectedItems, itemId]);
    }
  };
  /**
   * Removes the chip with the given itemId from the selectedItems state array.
   * @param {number} itemId The value of the chip to remove.
   */
  const handleChipRemove = (itemId: string) => {
    const chips = selectedItems.filter((value) => value !== itemId);
    onChange(chips);
  };

  const handleOpenSheetOptions = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <View style={styles.container}>
      {selectedItems.length > 0 ? (
        <View
          style={[
            styles.borderCommon,
            styles.inputWithChip,
            stylesDynamic.borderCommon,
          ]}
        >
          <Text
            color="placeholder"
            fontWeight="light"
            textStyle={{ paddingBottom: spacing[3] }}
          >
            {label}
          </Text>
          <View style={[styles.chipsContainer]}>
            {selectedItems.map((itemId) => {
              const item = options.find((i) => i.value === itemId);

              if (!item) return null;

              return (
                <DropdownChip
                  key={`chip-${item.value}`}
                  label={item.label}
                  value={item.value}
                  onRemove={handleChipRemove}
                  style={styles.dropdownChip}
                />
              );
            })}
          </View>
          <TouchableOpacity
            accessibilityLabel="Multiple dropdown button"
            accessibilityRole="button"
            disabled={disabled}
            onPress={handleOpenSheetOptions}
            style={styles.touchModal}
          />
        </View>
      ) : (
        <TouchableOpacity
          accessibilityLabel="Multiple dropdown button"
          accessibilityRole="button"
          disabled={disabled}
          onPress={handleOpenSheetOptions}
        >
          <Input
            label={label}
            variant="underlined"
            placeholder={placeholder}
            editable={false}
          />
        </TouchableOpacity>
      )}
      {error && (
        <Text color="error" fontWeight="light" textStyle={styles.error}>
          {error}
        </Text>
      )}

      <Suspense fallback={null}>
        <MultipleSelectSheet
          data={options}
          sheetRef={sheetRef}
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
        />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    width: '100%',
  },
  inputWithChip: { position: 'relative', width: '100%' },
  touchModal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  dropdownChip: { zIndex: 2 },
  borderCommon: {
    borderBottomWidth: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingRight: 20,
  },
  error: {
    paddingTop: spacing[3],
  },
});
