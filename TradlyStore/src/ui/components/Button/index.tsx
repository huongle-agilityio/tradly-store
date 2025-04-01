import { memo, ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  colorMap,
  sizes,
  textSizes,
  variantStyles,
  textVariants,
  getStyles,
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
  textStyles?: StyleProp<TextStyle>;
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
    textStyles,
    icon: Icon,
    children,
    onPress,
  }: ButtonProps) => {
    const styles = getStyles(isLoading);

    return (
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
        <View style={styles.contentWrapper}>
          {Icon}
          <Text
            style={[
              styles.text,
              textVariants[variant],
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
              textStyles,
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
    );
  },
);

Button.displayName = 'Button';
