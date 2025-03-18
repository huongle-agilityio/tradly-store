import { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

// Components
import { Text } from '@/ui/components';

//
import { lineHeights } from '@/ui/themes';

interface ListProductInfoProps {
  data: { title: string; value: string }[];
  style?: StyleProp<ViewStyle>;
}

export const ListProductInfo = memo(({ data, style }: ListProductInfoProps) =>
  data.map(({ title, value }) => (
    <View key={`product-info-${title}`} style={[styles.wrapper, style]}>
      <Text fontWeight="light" color="placeholder" textStyle={styles.title}>
        {title}
      </Text>
      <Text fontWeight="normal" color="placeholder" textStyle={styles.text}>
        {value}
      </Text>
    </View>
  )),
);

ListProductInfo.displayName = 'ListProductInfo';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: { width: '40%', lineHeight: lineHeights.md },
  text: { width: '60%' },
});
