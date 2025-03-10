import { memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

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
    <View
      key={`product-info-${title}`}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <Text
        fontWeight="light"
        color="placeholder"
        textStyle={{ width: '40%', lineHeight: lineHeights.md }}
      >
        {title}
      </Text>
      <Text
        fontWeight="normal"
        color="placeholder"
        textStyle={{ width: '60%' }}
      >
        {value}
      </Text>
    </View>
  )),
);

ListProductInfo.displayName = 'ListProductInfo';
