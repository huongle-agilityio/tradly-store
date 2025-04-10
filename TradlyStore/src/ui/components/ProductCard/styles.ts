import { StyleSheet } from 'react-native';

// Themes
import { colors, lineHeights, radius, spacing } from '@/ui/themes';

export const getStyles = (discount: number | undefined) =>
  StyleSheet.create({
    container: {
      width: spacing[40],
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.categoryCard.border,
    },
    imageRadius: {
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
    },
    image: {
      height: 125,
      position: 'relative',
      width: '100%',
      elevation: 2,
    },
    imageWrapper: {
      backgroundColor: colors.opacity,
    },
    storeImage: {
      width: spacing[5],
      height: spacing[5],
      borderRadius: radius.full,
    },
    content: {
      gap: spacing['3.5'],
      padding: spacing[3],
      backgroundColor: colors.light,
      borderBottomLeftRadius: radius.lg,
      borderBottomRightRadius: radius.lg,
    },
    textWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['1.5'],
    },
    informationWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 5,
    },
    store: {
      lineHeight: lineHeights.sm,
      width: discount ? 40 : 65,
    },
    price: {
      textDecorationLine: 'line-through',
    },
  });

export const productActions = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 44,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: 'rgba(181, 185, 185, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
