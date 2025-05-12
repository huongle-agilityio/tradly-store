import { lazy, ReactNode, Suspense, useCallback, useMemo, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

// Components
import { Text } from '../Text';

// Themes
import { spacing } from '@/themes';

// Interfaces
import { Option } from '@/interfaces';
import { useTheme } from '@react-navigation/native';

const SingleSelectSheet = lazy(() =>
  import('../DropdownModal/SingleSelectSheet').then((module) => ({
    default: module.SingleSelectSheet,
  })),
);

interface DropdownProps {
  disabled?: boolean;
  label?: string;
  value?: string;
  error?: string;
  placeholder?: string;
  options: Option[];
  style?: StyleProp<ViewStyle>;
  renderRightIcon?: ReactNode;
  onChange: (value: string) => void;
}
export const Dropdown = ({
  disabled,
  label,
  value,
  error,
  placeholder,
  renderRightIcon: RenderRightIcon,
  options,
  style,
  onChange,
}: DropdownProps) => {
  const { colors } = useTheme();
  const sheetRef = useRef<BottomSheet>(null);

  const stylesDynamic = useMemo(
    () =>
      StyleSheet.create({
        label: {
          color: colors.text.primary,
        },
      }),
    [colors.text.primary],
  );

  const selectedLabel = options.find((option) => option.value === value)?.label;

  const handleCloseModal = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSelect = useCallback(
    (selectedValue: string) => {
      onChange(selectedValue);
      handleCloseModal();
    },
    [handleCloseModal, onChange],
  );

  const handleOpenSheetOptions = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <View style={style}>
      {label && (
        <Text style={[styles.label, stylesDynamic.label]}>{label}</Text>
      )}
      <TouchableOpacity
        accessibilityLabel="Dropdown button"
        accessibilityRole="button"
        testID="single-select-modal"
        disabled={disabled}
        style={styles.selectBox}
        onPress={handleOpenSheetOptions}
        activeOpacity={0.8}
      >
        <Text fontSize="sm" color="placeholder">
          {selectedLabel || placeholder}
        </Text>

        {RenderRightIcon}
      </TouchableOpacity>

      {error && (
        <Text color="error" fontWeight="light" textStyle={styles.error}>
          {error}
        </Text>
      )}

      <Suspense fallback={null}>
        <SingleSelectSheet
          sheetRef={sheetRef}
          data={options}
          selectedItem={value || ''}
          handleCloseModal={handleCloseModal}
          onItemSelect={handleSelect}
        />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  selectBox: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
  },
  error: {
    paddingTop: spacing[3],
  },
});
