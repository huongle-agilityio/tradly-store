import { StyleSheet } from 'react-native';

// Themes
import { colors, fontWeights, lineHeights, radius, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  disabled: {
    opacity: 0.7,
  },
  error: {
    paddingHorizontal: spacing['2.5'],
    paddingTop: spacing[3],
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[3],
  },
  text: {
    color: colors.select.textPrimary,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.xs,
  },
  optionsContainer: {
    width: '100%',
    maxHeight: 150,
    zIndex: 999,
    top: 40,
    position: 'absolute',
    backgroundColor: colors.select.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: radius.sm,
  },
  option: {
    padding: spacing[3],
  },
});
