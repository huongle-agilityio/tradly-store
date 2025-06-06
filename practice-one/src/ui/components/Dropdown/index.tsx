import { StyleSheet, View } from 'react-native';
import RNPickerSelect, {
  PickerSelectProps,
  PickerStyle,
} from 'react-native-picker-select';

// Components
import { Text } from '../Text';

// Themes
import { spacing } from '@/ui/themes';

interface DropdownProps extends PickerSelectProps {
  disabled?: boolean;
  error?: string;
  style?: PickerStyle;
  onValueChange: (value: string) => void;
}

export const Dropdown = ({
  disabled,
  onValueChange,
  style,
  error,
  ...props
}: DropdownProps) => (
  <View>
    <RNPickerSelect
      disabled={disabled}
      onValueChange={onValueChange}
      style={style}
      {...props}
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
    paddingHorizontal: spacing['2.5'],
    paddingTop: spacing[3],
  },
});
