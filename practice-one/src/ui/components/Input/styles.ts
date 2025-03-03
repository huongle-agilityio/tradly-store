import { StyleSheet } from 'react-native';

// Themes
import { colors, fontSizes, lineHeights, radius, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerHasIcon: {
    flexDirection: 'row',
    gap: 25,
  },
  label: {
    paddingBottom: spacing[3],
  },
  disabled: {
    opacity: 0.7,
  },
});

export const containerStyles = StyleSheet.create({
  default: {
    paddingVertical: 13,
    paddingHorizontal: spacing[4],
    borderColor: colors.input.borderPrimary,
    borderWidth: 1,
    borderRadius: radius['3xl'],
  },
  outlined: {
    flexDirection: 'row',
    gap: 25,
    paddingVertical: 11,
    paddingHorizontal: spacing['4.5'],
    borderWidth: 1,
    borderColor: colors.input.borderPrimary,
    borderRadius: radius['3xl'],
    backgroundColor: colors.input.backgroundPrimary,
  },
  underlined: {
    borderBottomWidth: 1,
    borderColor: colors.input.borderSecondary,
  },
});

export const inputStyles = StyleSheet.create({
  default: {
    color: colors.input.textPrimary,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.xl,
  },
  outlined: {
    color: colors.input.textQuaternary,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
  },
  underlined: {
    paddingBottom: spacing['2.5'],
    color: colors.input.textTertiary,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.xl,
  },
});

export const colorMap = {
  default: colors.input.textPrimary,
  outlined: colors.input.textSecondary,
  underlined: colors.placeholder,
};
