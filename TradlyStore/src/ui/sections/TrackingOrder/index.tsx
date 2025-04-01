import { View } from 'react-native';
import { trackingOrderStyles } from './styles';

// Mocks
import { ORDER_TRACKING } from '@/mocks';

// Components
import { Text } from '@/ui/components';
import { TrackingOrderItem } from './TrackingOrderItem';

// Themes
import { lineHeights } from '@/ui/themes';

export const TrackingOrder = () => (
  <View style={trackingOrderStyles.container}>
    <View>
      <Text fontWeight="medium" fontSize="md" color="quaternary">
        Track Order
      </Text>
      <Text
        fontWeight="normal"
        color="fade"
        textStyle={{ lineHeight: lineHeights.sm }}
      >
        Order ID - 123455
      </Text>
      <View style={trackingOrderStyles.underline} />
    </View>

    <View style={trackingOrderStyles.listOrder}>
      {ORDER_TRACKING.map(
        ({ date, title, description, time, isActive }, index) => (
          <TrackingOrderItem
            key={`tracking-order-${index}`}
            date={date}
            title={title}
            description={description}
            time={time}
            isActive={isActive}
          />
        ),
      )}
    </View>
  </View>
);
