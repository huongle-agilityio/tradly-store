import { StyleSheet } from 'react-native';

// Themes
import { colors, spacing } from '@/themes';

export const getStyles = (onRemoveItem: boolean) =>
  StyleSheet.create({
    cartWrapper: { backgroundColor: colors.light },
    content: {
      paddingHorizontal: spacing[4],
      flexDirection: 'row',
      gap: 15,
      ...(onRemoveItem
        ? { paddingBottom: spacing[3], paddingTop: spacing['7.5'] }
        : { paddingVertical: 25 }),
    },
    textWrapper: {
      justifyContent: 'space-between',
      paddingTop: spacing['3.5'],
      paddingBottom: spacing['2.5'],
    },
    priceWrapper: { flexDirection: 'row', gap: spacing['3.5'] },
    quantityWrapper: { flexDirection: 'row', alignItems: 'center' },
    buttonWrapper: {
      width: '100%',
      paddingVertical: spacing[3],
      alignItems: 'center',
      borderTopColor: colors.productCard.border,
      borderTopWidth: 0.5,
    },
    discountWrapper: { flexDirection: 'row', gap: 5 },
    discountText: {
      textDecorationLine: 'line-through',
    },
  });
