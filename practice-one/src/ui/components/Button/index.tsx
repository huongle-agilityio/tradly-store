import { memo, ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  colorMap,
  sizes,
  styles,
  textSizes,
  textStyles,
  variantStyles,
} from './styles';

// Themes
import { colors } from '@/ui/themes';

// Interfaces
import {
  ButtonColor,
  ButtonSize,
  ButtonTextSize,
  ButtonVariant,
} from '@/interfaces';

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  textSize?: ButtonTextSize;
  buttonStyles?: StyleProp<ViewStyle>;
  icon?: ReactNode;
  children: ReactNode;
  onPress?: () => void;
}

export const Button = memo(
  ({
    disabled = false,
    size = 'medium',
    color = 'primary',
    variant = 'solid',
    textSize = 'base',
    isLoading = false,
    buttonStyles,
    icon: Icon,
    children,
    onPress,
  }: ButtonProps) => (
    <TouchableOpacity
      testID="button"
      style={[
        styles.button,
        sizes[size],
        variantStyles[variant],
        {
          borderColor: colorMap[color],
          backgroundColor:
            variant === 'solid' ? colorMap[color] : colors.transparent,
        },
        (disabled || isLoading) && styles.disabled,
        buttonStyles,
      ]}
      disabled={disabled || isLoading}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.contentWrapper, { opacity: isLoading ? 0 : 1 }]}>
        {Icon}
        <Text
          style={[
            styles.text,
            textStyles[variant],
            textSizes[textSize],
            {
              color:
                color === 'secondary'
                  ? variant === 'solid'
                    ? colors.button.backgroundPrimary
                    : colors.light
                  : variant === 'solid'
                    ? colors.button.textSecondary
                    : colorMap[color],
            },
          ]}
        >
          {children}
        </Text>
      </View>
      {isLoading && (
        <ActivityIndicator
          testID="button-loading"
          size="small"
          style={styles.loading}
          color={colorMap[color]}
        />
      )}
    </TouchableOpacity>
  ),
);

Button.displayName = 'Button';
