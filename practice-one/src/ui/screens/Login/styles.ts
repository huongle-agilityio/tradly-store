import { StyleSheet } from 'react-native';

// Themes
import { colors } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  content: {
    maxWidth: 320,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    alignItems: 'center',
  },
});
