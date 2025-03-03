import { StyleSheet } from 'react-native';

// Themes
import {
  fontWeights as baseFontWeights,
  fontSizes as baseFontSizes,
  colors as baseColors,
} from '@/ui/themes';

export const fontSizes = StyleSheet.create({
  xxs: { fontSize: baseFontSizes.xxs },
  xs: { fontSize: baseFontSizes.xs },
  sm: { fontSize: baseFontSizes.sm },
  base: { fontSize: baseFontSizes.base },
  md: { fontSize: baseFontSizes.md },
  lg: { fontSize: baseFontSizes.lg },
  xl: { fontSize: baseFontSizes.xl },
  xxl: { fontSize: baseFontSizes.xxl },
  xxxl: { fontSize: baseFontSizes.xxxl },
});

export const fontWeights = StyleSheet.create({
  light: { fontWeight: baseFontWeights.light },
  normal: { fontWeight: baseFontWeights.normal },
  medium: { fontWeight: baseFontWeights.medium },
  bold: { fontWeight: baseFontWeights.bold },
});

export const colors = StyleSheet.create({
  default: { color: baseColors.text.default },
  light: { color: baseColors.text.light },
  primary: { color: baseColors.text.primary },
  secondary: { color: baseColors.text.secondary },
  tertiary: { color: baseColors.text.tertiary },
  quaternary: { color: baseColors.text.quaternary },
  placeholder: { color: baseColors.text.placeholder },
  error: { color: baseColors.text.error },
  success: { color: baseColors.text.success },
});
