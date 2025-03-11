import { memo } from 'react';
import { View } from 'react-native';
import { trackingOrderItemStyles } from './styles';

// Components
import { Text } from '@/ui/components';

// Themes
import { lineHeights } from '@/ui/themes';

interface TrackingOrderItemProps {
  date: string;
  title: string;
  description: string;
  time: string;
  isActive?: boolean;
}

export const TrackingOrderItem = memo(
  ({ date, title, description, time, isActive }: TrackingOrderItemProps) => (
    <View style={trackingOrderItemStyles.container}>
      <View style={trackingOrderItemStyles.text}>
        <View style={trackingOrderItemStyles.wrapper}>
          <Text
            fontWeight="normal"
            textStyle={{ lineHeight: lineHeights.sm }}
            color="quaternary"
          >
            {title}
          </Text>
          <Text
            fontSize="xxs"
            fontWeight="normal"
            textStyle={{ lineHeight: lineHeights.sm }}
            color="fade"
          >
            {date}
          </Text>
        </View>
        <View style={trackingOrderItemStyles.wrapper}>
          <Text
            fontSize="xxs"
            fontWeight="normal"
            textStyle={{ lineHeight: lineHeights.sm }}
            color="fade"
          >
            {description}
          </Text>
          <Text
            fontSize="xxs"
            fontWeight="normal"
            textStyle={{ lineHeight: lineHeights.sm }}
            color="fade"
          >
            {time}
          </Text>
        </View>
        {isActive && <View style={trackingOrderItemStyles.active} />}
      </View>
    </View>
  ),
);

TrackingOrderItem.displayName = 'TrackingOrderItem';
