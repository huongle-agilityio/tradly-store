import { memo, useCallback, useState } from 'react';
import { useClickOutside } from 'react-native-click-outside';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  FlatList,
  TextInput,
  TextInputProps as NativeSelectProps,
} from 'react-native';

// Components
import { Text } from '../Text';
import { OptionItem } from './OptionItem';

// Icons
import { ArrowDownIcon } from '@/ui/icons';

// Interfaces
import { Option } from '@/interfaces';

// Themes
import { styles } from './styles';

interface SelectProps extends Omit<NativeSelectProps, 'style'> {
  value: string;
  error?: string;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  options: Option[];
  style?: StyleProp<ViewStyle>;
  onValueChange: (value: string) => void;
}

export const Select = memo(
  ({
    value,
    error,
    disabled,
    isLoading,
    options,
    onValueChange,
    placeholder,
    style,
    ...props
  }: SelectProps) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleSelect = useCallback(
      (value: string) => {
        onValueChange(value);
        setShowOptions(false);
      },
      [onValueChange],
    );

    const handleToggleOptions = () => {
      setShowOptions(!showOptions);
    };

    const ref = useClickOutside<View>(() => setShowOptions(false));

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          (disabled || isLoading) && styles.disabled,
          style,
        ]}
      >
        <TouchableOpacity
          testID="select-box"
          onPress={handleToggleOptions}
          style={styles.selectBox}
          disabled={disabled || isLoading}
        >
          <TextInput
            value={value}
            placeholder={placeholder}
            editable={false}
            style={styles.text}
            {...props}
          />
          <ArrowDownIcon />
        </TouchableOpacity>
        {error && (
          <Text color="error" fontWeight="light" textStyle={styles.error}>
            {error}
          </Text>
        )}

        {showOptions && (
          <FlatList
            data={options}
            keyExtractor={({ value }) => `option-item-${value}`}
            renderItem={({ item: { value, label } }) => (
              <OptionItem label={label} value={value} onSelect={handleSelect} />
            )}
            style={styles.optionsContainer}
          />
        )}
      </View>
    );
  },
);

Select.displayName = 'Select';
