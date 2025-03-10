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
    width: 310,
    alignSelf: 'center',
  },
  textWrapper: {
    alignItems: 'center',
  },
});
