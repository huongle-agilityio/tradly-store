import { StyleSheet } from 'react-native';

// Themes
import { colors, radius, spacing } from '@/ui/themes';

export const deliveryAddressStyles = StyleSheet.create({
  container: { backgroundColor: colors.light, borderRadius: radius.lg },
  titleWrapper: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing['4.5'],
  },
  textWrapper: {
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing['4.5'],
    gap: spacing[2],
  },
  infoWrapper: { flexDirection: 'row', gap: 5 },
});

export const orderSuccessStyles = StyleSheet.create({
  contentContainerStyle: { paddingBottom: 50 },
  imageWrapper: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { marginVertical: 16 },
});
