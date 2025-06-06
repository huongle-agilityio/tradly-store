import { memo, ReactNode, useMemo } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';

// Stores
import { useThemeStore } from '@/stores';

// Interfaces
import {
  ButtonColor,
  ButtonSize,
  ButtonTextSize,
  ButtonVariant,
} from '@/interfaces';

// Themes
import {
  fontsFamily,
  fontWeights,
  lineHeights,
  radius,
  spacing,
} from '@/themes';

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
    const { colors } = useTheme();
    const isDark = useThemeStore((store) => store.isDark);

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          hidden: {
            opacity: isLoading ? 0 : 1,
          },
        }),
      [isLoading],
    );

    const colorMap = useMemo(
      () => ({
        primary: colors.button.backgroundPrimary,
        secondary: colors.button.backgroundSecondary,
        dark: colors.button.textDark,
        success: colors.button.success,
        error: colors.button.error,
      }),
      [colors],
    );

    const variantStyles = useMemo(
      () =>
        StyleSheet.create({
          solid: { borderWidth: 0 },
          bordered: { backgroundColor: colors.transparent },
          ghost: { backgroundColor: colors.transparent, borderWidth: 0 },
        }),
      [colors],
    );

    const textVariants = useMemo(
      () =>
        StyleSheet.create({
          solid: { color: colors.button.textSecondary },
          bordered: {},
          ghost: {},
        }),
      [colors],
    );

    const textColors = useMemo(
      () =>
        color === 'secondary'
          ? variant === 'solid'
            ? isDark
              ? colors.button.textPrimary
              : colors.button.backgroundPrimary
            : colors.light
          : variant === 'solid'
          ? colors.button.textSecondary
          : colorMap[color],
      [color, colorMap, colors, isDark, variant],
    );

    return (
      <Animated.View
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
      >
        <TouchableOpacity
          testID="button"
          accessibilityRole="button"
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
          <View style={[styles.contentWrapper, stylesDynamic.hidden]}>
            {Icon}
            <Text
              style={[
                styles.text,
                textVariants[variant],
                textSizes[textSize],
                {
                  color: textColors,
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
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    borderRadius: radius['3xl'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: spacing['0.5'],
  },
  disabled: {
    opacity: 0.7,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  loading: {
    position: 'absolute',
  },
  text: {
    fontFamily: fontsFamily.regular,
  },
});

const sizes = StyleSheet.create({
  none: {},
  full: { width: '100%' },
  small: { paddingVertical: spacing[1], paddingHorizontal: spacing[3] },
  medium: { paddingVertical: spacing[1], paddingHorizontal: 23 },
});

const textSizes = StyleSheet.create({
  xs: {
    fontSize: spacing[3],
    lineHeight: lineHeights.xs,
    fontFamily: fontsFamily.medium,
    fontWeight: fontWeights.normal,
  },
  base: {
    fontSize: spacing[3],
    lineHeight: lineHeights.lg,
    fontFamily: fontsFamily.semiBold,
    fontWeight: fontWeights.bold,
  },
  md: {
    fontSize: spacing['3.5'],
    lineHeight: lineHeights.sm,
    fontFamily: fontsFamily.medium,
    fontWeight: fontWeights.normal,
  },
  lg: {
    fontSize: spacing[4],
    lineHeight: lineHeights.sm,
    fontFamily: fontsFamily.medium,
    fontWeight: fontWeights.normal,
  },
  xl: {
    fontSize: spacing['4.5'],
    lineHeight: lineHeights.sm,
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.medium,
  },
});
