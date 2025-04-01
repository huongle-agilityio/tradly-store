import { StyleSheet } from 'react-native';

// Themes
import { colors, radius, spacing } from '@/ui/themes';

export const trackingOrderItemStyles = StyleSheet.create({
  container: { paddingVertical: 25 },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: { position: 'relative', paddingLeft: 55 },
  active: {
    width: 2,
    height: spacing['5.5'],
    backgroundColor: colors.text.fade,
    position: 'absolute',
    left: 0,
    top: spacing[2],
  },
});

export const trackingOrderStyles = StyleSheet.create({
  container: {
    paddingVertical: spacing['4.5'],
    paddingHorizontal: spacing[5],
    marginTop: spacing[4],
    elevation: 5,
    marginBottom: spacing[6],
    borderRadius: radius.lg,
    backgroundColor: colors.light,
  },
  underline: {
    width: '20%',
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    marginTop: spacing[3],
  },
  listOrder: { gap: 15 },
});
