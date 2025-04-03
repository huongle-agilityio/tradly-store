import { StyleSheet, View } from 'react-native';
import { Dropdown as DropdownBase } from 'react-native-element-dropdown';
import { DropdownProps as DropdownBaseProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

// Components
import { Text } from '../Text';

// Themes
import { colors, fontsFamily, fontSizes, spacing } from '@/ui/themes';

type DropdownProps = Omit<
  DropdownBaseProps<any>,
  'labelField' | 'valueField'
> & {
  disabled?: boolean;
  error?: string;
};

export const Dropdown = ({
  disabled,
  error,
  style,
  data,
  onChange,
  ...props
}: DropdownProps) => (
  <View>
    <DropdownBase
      testID="dropdown"
      {...props}
      data={data}
      itemTextStyle={styles.itemTextStyle}
      onChange={onChange}
      labelField="label"
      valueField="value"
      maxHeight={200}
      disable={disabled}
      style={[styles.dropdown, style]}
      selectedTextStyle={styles.selectedTextStyle}
    />
    {error && (
      <Text color="error" fontWeight="light" textStyle={styles.error}>
        {error}
      </Text>
    )}
  </View>
);

export const styles = StyleSheet.create({
  error: {
    paddingTop: spacing[3],
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
  },
  itemTextStyle: {
    textAlign: 'center',
  },
  selectedTextStyle: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamily.regular,
    color: colors.secondary,
  },
});
