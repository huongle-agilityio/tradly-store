import { StyleSheet } from 'react-native';

// Themes
import { colors } from '@/themes';

export const getStyles = (containerWidth: number) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      height: '100%',
      backgroundColor: colors.opacity,
    },
    dotWrapper: {
      flexDirection: 'row',
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
      bottom: 15,
      zIndex: 999,
      gap: 5,
    },
    image: {
      width: containerWidth,
      resizeMode: 'cover',
    },
  });
