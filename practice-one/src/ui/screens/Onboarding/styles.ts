import { StyleSheet } from 'react-native';

// Themes
import { colors, radius, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  headerWrapper: {
    backgroundColor: colors.primary,
    width: '100%',
    height: '40%',
  },
  scroll: {
    paddingTop: 57,
    backgroundColor: colors.light,
    borderRadius: radius.lg,
  },
  content: {
    alignSelf: 'center',
    height: '60%',
    position: 'relative',
    justifyContent: 'flex-end',
    paddingBottom: spacing['7.5'],
  },
  slideWrapper: {
    position: 'absolute',
    top: -150,
  },
  imageWrapper: {
    alignItems: 'center',
    gap: 100,
  },
  dotWrapper: {
    flexDirection: 'row',
    gap: spacing['2.5'],
    justifyContent: 'center',
  },
  dot: {
    width: spacing[3],
    height: spacing[3],
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
});
