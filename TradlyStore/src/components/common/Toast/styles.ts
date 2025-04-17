import { StyleSheet } from 'react-native';

// Themes
import { colors, radius, spacing } from '@/themes';

// Interfaces
import { ToastColor } from '@/interfaces';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing['2.5'],
    paddingHorizontal: spacing[4],
    position: 'absolute',
    alignSelf: 'center',
    bottom: '12%',
    borderRadius: radius.full,
    elevation: 5,
  },
});

export const colorMap: Record<ToastColor, string> = {
  default: colors.toast.default,
  success: colors.toast.success,
  error: colors.toast.error,
};
