import { StyleSheet } from 'react-native';

// Themes
import { spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: { gap: spacing[7], marginTop: spacing[4], marginBottom: 90 },
  contentWrapper: { gap: spacing[4] },
  content: {
    paddingHorizontal: spacing[5],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
