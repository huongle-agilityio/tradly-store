import { lazy, ReactNode, Suspense, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// Components
import { Text } from '../Text';

// Themes
import { colors, spacing } from '@/ui/themes';

// Interfaces
import { Option } from '@/interfaces';

const SingleSelectModal = lazy(() =>
  import('../DropdownModal/SingleSelectModal').then((module) => ({
    default: module.SingleSelectModal,
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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  const handleCloseModal = () => setIsModalVisible(false);
  const handleOpenModal = () => setIsModalVisible(true);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    handleCloseModal();
  };

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        accessibilityLabel="Dropdown button"
        accessibilityRole="button"
        testID="single-select-modal"
        disabled={disabled}
        style={styles.selectBox}
        onPress={handleOpenModal}
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
        <SingleSelectModal
          isModalVisible={isModalVisible}
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
    color: colors.text.primary,
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
    color: colors.text.primary,
  },
  placeholderText: {
    color: colors.text.secondary,
  },
  error: {
    paddingTop: spacing[3],
  },
});
