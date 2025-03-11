import { StyleSheet } from 'react-native';

// Themes
import { colors, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light },
  currentLocationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[5],
    backgroundColor: colors.light,
    elevation: spacing['2.5'],
  },
  formWrapper: {
    paddingLeft: spacing[7],
    paddingRight: spacing['2.5'],
    paddingTop: spacing[9],
    paddingBottom: 50,
    gap: spacing[4],
  },
});
