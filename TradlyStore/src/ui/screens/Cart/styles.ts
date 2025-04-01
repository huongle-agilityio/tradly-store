import { StyleSheet } from 'react-native';

// Themes
import { colors, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: spacing['2.5'],
    paddingTop: spacing['2.5'],
    paddingBottom: spacing[7],
  },
  buttonAddressWrapper: {
    width: '100%',
    paddingVertical: spacing['4.5'],
    alignItems: 'center',
    backgroundColor: colors.light,
  },
  addressWrapper: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light,
  },
  textDelivery: { gap: spacing[1.5], width: '70%' },
  text: { opacity: 0.7 },
  button: {
    width: 100,
    height: 23,
  },
});
