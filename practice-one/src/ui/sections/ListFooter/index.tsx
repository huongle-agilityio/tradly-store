import { memo } from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';

// Themes
import { colors } from '@/ui/themes';

interface ListFooterProps {
  style?: StyleProp<ViewStyle>;
}

export const ListFooter = memo(({ style }: ListFooterProps) => (
  <View style={style}>
    <ActivityIndicator size="large" color={colors.secondary} />
  </View>
));

ListFooter.displayName = 'ListFooter';
