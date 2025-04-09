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
  icon: {
    position: 'relative',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.full,
    backgroundColor: 'rgba(181, 185, 185, 0.6)',
    borderWidth: 1,
    borderColor: '#fff',
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
  banner: {
    marginLeft: 10,
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  textPrice: {
    marginLeft: 15,
    marginRight: 5,
    textDecorationLine: 'line-through',
  },
  headerWrapper: { height: 226, position: 'relative' },
  iconWrapper: { flexDirection: 'row', gap: 13 },
  loading: { gap: 10 },
  image: { width: 32, height: 32, borderRadius: radius.full },
  button: { height: 23 },
});
