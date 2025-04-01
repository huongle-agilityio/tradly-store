import { StyleSheet } from 'react-native';

// Themes
import { colors, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    maxWidth: 320,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    alignItems: 'center',
  },
  title: { gap: 66, marginBottom: 45 },
  subtitle: { gap: 45, marginTop: spacing[8] },
});
