import { View, StyleSheet } from 'react-native';

// Mocks
import { ORDER_TRACKING } from '@/mocks';

// Components
import { Text } from '@/components/common';
import { TrackingOrderItem } from '../TrackingOrderItem';

// Themes
import { colors, radius, spacing, lineHeights } from '@/themes';

export const TrackingOrder = () => (
  <View style={styles.container}>
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
      <View style={styles.underline} />
    </View>

    <View style={styles.listOrder}>
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing['4.5'],
    paddingHorizontal: spacing[5],
    marginTop: spacing[4],
    elevation: 5,
    marginBottom: spacing[6],
    borderRadius: radius.lg,
    backgroundColor: colors.light,
  },
  underline: {
    width: '20%',
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    marginTop: spacing[3],
  },
  listOrder: { gap: 15 },
});
