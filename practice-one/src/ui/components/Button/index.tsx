import { memo, ReactNode } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import {
  colorMap,
  ColorScheme,
  sizes,
  styles,
  textSizes,
  textStyles,
  variantStyles,
} from './styles';

// Themes
import { colors } from '@/ui/themes';

type Sizes = 'none' | 'small' | 'medium' | 'full';
type Variant = 'solid' | 'bordered' | 'ghost';
type TextSizes = 'xs' | 'base' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  size?: Sizes;
  variant?: Variant;
  color?: ColorScheme;
  textSize?: TextSizes;
  icon?: ReactNode;
  children: ReactNode;
  onPress?: () => void;
}

const Button = ({
  disabled,
  size = 'medium',
  color = 'primary',
  variant = 'solid',
  textSize = 'base',
  isLoading = false,
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
    ]}
    disabled={disabled || isLoading}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={{ position: 'relative' }}>
      <View style={styles.contentWrapper}>
        {Icon}
        <Text
          style={[
            styles.text,
            textStyles[variant],
            textSizes[textSize],
            {
              color:
                variant === 'solid'
                  ? colors.button.textSecondary
                  : colorMap[color],
            },
            { opacity: isLoading ? 0 : 1 },
          ]}
        >
          {children}
        </Text>
      </View>
      {/* Updating after have loading component */}
      {isLoading && <Text style={styles.loading}>Loading</Text>}
    </View>
  </TouchableOpacity>
);

export default memo(Button);
