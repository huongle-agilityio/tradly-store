import { StyleSheet } from 'react-native';

// Themes
import { colors, radius, spacing } from '@/ui/themes';

export const styles = StyleSheet.create({
  container: {
    width: spacing[40],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.categoryCard.border,
  },
  image: {
    height: 125,
    width: '100%',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    elevation: 2,
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
});
