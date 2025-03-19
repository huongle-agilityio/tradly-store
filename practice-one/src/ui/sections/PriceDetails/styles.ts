import { StyleSheet } from 'react-native';

// Themes
import { colors, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[6],
    gap: spacing[5],
  },
  wrapper: {
    gap: spacing['2.5'],
  },
  totalWrapper: {
    paddingTop: spacing[3],
    paddingBottom: spacing[6],
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    borderTopWidth: 0.5,
    borderColor: colors.productCard.border,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
