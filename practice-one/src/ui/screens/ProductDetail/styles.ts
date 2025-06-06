import { StyleSheet } from 'react-native';

// Themes
import { colors, radius, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: spacing['1.5'],
    paddingBottom: 100,
  },
  productWrapper: {
    paddingTop: spacing[4],
    paddingBottom: spacing['7.5'],
    paddingHorizontal: spacing[4],
  },
  header: {
    padding: spacing[4],
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    top: 0,
  },
  iconWrapper: {
    position: 'relative',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.light,
    borderRadius: radius.full,
    opacity: 0.5,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  storeWrapper: {
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeTitle: {
    gap: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    paddingVertical: 60,
    paddingHorizontal: spacing['7.5'],
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: spacing['7.5'],
  },
  contentWrapper: {
    borderRadius: radius.lg,
    backgroundColor: colors.light,
  },
});
