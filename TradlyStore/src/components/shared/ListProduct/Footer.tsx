import { memo } from 'react';
import { useTheme } from '@react-navigation/native';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';

interface ListFooterProps {
  style?: StyleProp<ViewStyle>;
}

export const ListFooter = memo(({ style }: ListFooterProps) => {
  const { colors } = useTheme();

  return (
    <View style={style}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
});
