import { StyleSheet } from 'react-native';

// Themes
import { colors } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.skeleton.backgroundPrimary,
    opacity: 0.4,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.skeleton.backgroundSecondary,
  },
});
