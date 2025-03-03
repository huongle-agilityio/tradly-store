import { StyleSheet } from 'react-native';

// Themes
import {
  colors,
  fontsFamily,
  fontWeights,
  lineHeights,
  radius,
  spacing,
} from '@/ui/themes';

export type ColorScheme = 'primary' | 'secondary' | 'success' | 'error';

export const styles = StyleSheet.create({
  button: {
    position: 'relative',
    borderRadius: radius['3xl'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
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

export const variantStyles = StyleSheet.create({
  solid: { borderWidth: 0 },
  bordered: { backgroundColor: colors.transparent },
  ghost: { backgroundColor: colors.transparent, borderWidth: 0 },
});

export const colorMap: Record<ColorScheme, string> = {
  primary: colors.button.backgroundPrimary,
  secondary: colors.button.backgroundSecondary,
  success: colors.button.success,
  error: colors.button.error,
};

export const sizes = StyleSheet.create({
  none: {},
  full: { width: '100%' },
  small: { paddingVertical: spacing[1], paddingHorizontal: spacing[3] },
  medium: { paddingVertical: spacing[1], paddingHorizontal: 23 },
});

export const textStyles = StyleSheet.create({
  solid: { color: colors.button.textSecondary },
  bordered: {},
  ghost: { opacity: 0.7 },
});

export const textSizes = StyleSheet.create({
  xs: {
    fontSize: spacing[3],
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.normal,
  },
  base: {
    fontSize: spacing[3],
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.bold,
  },
  md: {
    fontSize: spacing['3.5'],
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.normal,
  },
  lg: {
    fontSize: spacing[4],
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.normal,
  },
  xl: {
    fontSize: spacing['4.5'],
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.medium,
  },
});
