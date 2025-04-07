import { ForwardedRef, forwardRef, ReactNode } from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

// Components
import { Text } from '../Text';

// Themes
import { colorMap, containerStyles, inputStyles, styles } from './styles';

// Interfaces
import { InputVariant } from '@/interfaces';

interface InputProps extends TextInputProps {
  value?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
  label?: string;
  placeholder?: string;
  variant?: InputVariant;
  icon?: ReactNode;
  iconRight?: ReactNode;
  styleContainer?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
}

export const Input = forwardRef(
  (
    {
      value,
      label,
      isLoading,
      icon: Icon,
      iconRight: IconRight,
      onChangeText,
      error,
      disabled,
      placeholder,
      secureTextEntry,
      variant = 'default',
      styleContainer,
      ...props
    }: InputProps,
    ref: ForwardedRef<TextInput>,
  ) => (
    <View
      style={[
        styles.container,
        (disabled || isLoading) && styles.disabled,
        styleContainer,
      ]}
    >
      {label && (
        <Text color="placeholder" fontWeight="light" textStyle={styles.label}>
          {label}
        </Text>
      )}
      <View
        style={[
          containerStyles[variant],
          styles.container,
          ...(Icon || IconRight ? [styles.containerHasIcon] : []),
          ...(IconRight ? [styles.hasRightIcon] : []),
        ]}
      >
        {Icon}

        <TextInput
          ref={ref}
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

        {IconRight}
      </View>
      {error && (
        <Text color="error" fontWeight="light" textStyle={styles.error}>
          {error}
        </Text>
      )}
    </View>
  ),
);

Input.displayName = 'Input';
