import { StyleSheet } from 'react-native';

// Themes
import { colors, radius, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.light,
  },
  headerWrapper: {
    position: 'relative',
    backgroundColor: colors.primary,
    width: '100%',
    height: '40%',
  },
  imageWrapper: {
    position: 'absolute',
    bottom: '-50%',
    width: 310,
    height: 334,
    borderRadius: radius.lg,
    backgroundColor: colors.light,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    height: 250,
    marginBottom: spacing['7.5'],
  },
  bottomContentWrapper: {
    width: 310,
    marginTop: 200,
    alignItems: 'center',
    gap: 50,
  },
  dot: {
    width: spacing[3],
    height: spacing[3],
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
});
