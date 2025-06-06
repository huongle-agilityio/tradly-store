import { ForwardedRef, forwardRef, ReactNode, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

// Components
import { Text } from '../Text';

// Themes
import { fontsFamily, fontSizes, lineHeights, radius, spacing } from '@/themes';

// Interfaces
import { InputVariant } from '@/interfaces';
import { useTheme } from '@react-navigation/native';

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
  ) => {
    const { colors } = useTheme();
    const containerStylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          default: {
            borderColor: colors.input.borderPrimary,
          },
          outlined: {
            borderColor: colors.input.borderPrimary,
            backgroundColor: colors.input.backgroundPrimary,
          },
          underlined: {
            borderColor: colors.input.borderSecondary,
          },
        }),
      [
        colors.input.backgroundPrimary,
        colors.input.borderPrimary,
        colors.input.borderSecondary,
      ],
    );

    const inputStylesStylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          default: {
            color: colors.input.textPrimary,
          },
          outlined: {
            color: colors.input.textQuaternary,
          },
          underlined: {
            color: colors.input.textTertiary,
          },
        }),
      [
        colors.input.textPrimary,
        colors.input.textQuaternary,
        colors.input.textTertiary,
      ],
    );

    const colorMap = useMemo(
      () => ({
        default: colors.input.textPrimary,
        outlined: colors.input.textSecondary,
        underlined: colors.input.textPlaceholder,
      }),
      [
        colors.input.textPrimary,
        colors.input.textSecondary,
        colors.input.textPlaceholder,
      ],
    );

    return (
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
            containerStylesDynamic[variant],
            styles.container,
            ...(Icon || IconRight ? [styles.containerHasIcon] : []),
            ...(IconRight ? [styles.hasRightIcon] : []),
          ]}
        >
          <View>{Icon}</View>

          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            editable={!(isLoading || disabled)}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={[
              inputStyles[variant],
              inputStylesStylesDynamic[variant],
              { flex: 2 },
            ]}
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
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerHasIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  hasRightIcon: {
    justifyContent: 'space-between',
  },
  label: {
    paddingBottom: spacing[3],
  },
  error: {
    paddingTop: spacing[3],
  },
  disabled: {
    opacity: 0.7,
  },
});

const containerStyles = StyleSheet.create({
  default: {
    paddingVertical: 13,
    paddingHorizontal: spacing[4],
    borderWidth: 1,
    borderRadius: radius['3xl'],
  },
  outlined: {
    flexDirection: 'row',
    gap: 25,
    paddingVertical: 5,
    paddingHorizontal: spacing['4.5'],
    borderWidth: 1,
    borderRadius: radius['3xl'],
  },
  underlined: {
    borderBottomWidth: 1,
  },
});

const inputStyles = StyleSheet.create({
  default: {
    fontFamily: fontsFamily.regular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.xl,
  },
  outlined: {
    fontFamily: fontsFamily.regular,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
  },
  underlined: {
    paddingBottom: spacing['2.5'],
    fontFamily: fontsFamily.regular,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.xl,
  },
});
