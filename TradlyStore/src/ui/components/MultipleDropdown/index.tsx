import { useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { StyleSheet, View } from 'react-native';
import { MultiSelectProps } from 'react-native-element-dropdown/lib/typescript/components/MultiSelect/model';

// Components
import { Text } from '../Text';
import { DropdownItem } from './DropdownItem';

// Interfaces
import { Option } from '@/interfaces';

// Themes
import { colors, fontsFamily, lineHeights, spacing } from '@/ui/themes';

interface MultipleDropdownProps
  extends Omit<MultiSelectProps<Option>, 'labelField' | 'valueField'> {
  label?: string;
  error?: string;
  data: Option[];
}

export const MultipleDropdown = ({
  data,
  label,
  error,
  value,
  onChange,
  ...props
}: MultipleDropdownProps) => {
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);

  const handleFocus = () => {
    setShowPlaceholder(true);
  };

  const handleBlur = () => {
    setShowPlaceholder(false);
  };

  const renderSelectedItem = (
    item: Option,
    unSelect: ((item: Option) => void) | undefined,
  ) => <DropdownItem item={item} unSelect={unSelect} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.wrapper}>
        <MultiSelect
          testID="multiple-dropdown"
          style={styles.dropdown}
          placeholderStyle={!showPlaceholder && !!value?.length && styles.hide}
          data={data}
          labelField="label"
          valueField="value"
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          iconStyle={styles.hide}
          renderSelectedItem={renderSelectedItem}
          {...props}
          onChange={onChange}
        />
      </View>
      {error && (
        <Text color="error" fontWeight="light" textStyle={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.secondary,
    fontFamily: fontsFamily.regular,
    lineHeight: lineHeights.base,
    opacity: 0.5,
    marginBottom: spacing['2.5'],
  },
  container: {
    width: '100%',
    padding: spacing[4],
  },
  wrapper: { minHeight: 30, position: 'relative' },
  dropdown: {
    color: 'red',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    borderBottomWidth: 1,
    borderColor: colors.input.borderSecondary,
  },
  hide: {
    opacity: 0,
  },
  error: {
    paddingTop: spacing[3],
  },
});
