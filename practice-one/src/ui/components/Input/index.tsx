import { ReactNode } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

// Components
import { Text } from '../Text';

// Themes
import { colorMap, containerStyles, inputStyles, styles } from './styles';

// Interfaces
import { InputVariant } from '@/interfaces';

interface InputProps extends TextInputProps {
  value: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
  label?: string;
  placeholder?: string;
  variant?: InputVariant;
  icon?: ReactNode;
  onChangeText: (text: string) => void;
}

export const Input = ({
  value,
  label,
  isLoading,
  icon: Icon,
  onChangeText,
  error,
  disabled,
  placeholder,
  secureTextEntry,
  variant = 'default',
  ...props
}: InputProps) => (
  <View style={[styles.container, (disabled || isLoading) && styles.disabled]}>
    {label && (
      <Text color="placeholder" fontWeight="light" textStyle={styles.label}>
        {label}
      </Text>
    )}
    <View
      style={[
        containerStyles[variant],
        styles.container,
        ...(Icon ? [styles.containerHasIcon] : []),
      ]}
    >
      {Icon}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={!(isLoading || disabled)}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={inputStyles[variant]}
        placeholderTextColor={colorMap[variant]}
        selectionColor={colorMap[variant]}
        {...props}
      />
    </View>
    {error && (
      <Text color="error" fontWeight="light" textStyle={styles.error}>
        {error}
      </Text>
    )}
  </View>
);
