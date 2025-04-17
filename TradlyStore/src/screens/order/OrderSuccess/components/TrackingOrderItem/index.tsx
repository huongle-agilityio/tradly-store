import { memo } from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { Text } from '@/components/common';

// Themes
import { colors, lineHeights, spacing } from '@/themes';

interface TrackingOrderItemProps {
  date: string;
  title: string;
  description: string;
  time: string;
  isActive?: boolean;
}

export const TrackingOrderItem = memo(
  ({ date, title, description, time, isActive }: TrackingOrderItemProps) => (
    <View style={styles.container}>
      <View style={styles.text}>
        <View style={styles.wrapper}>
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
        <View style={styles.wrapper}>
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
        {isActive && <View style={styles.active} />}
      </View>
    </View>
  ),
);

export const styles = StyleSheet.create({
  container: { paddingVertical: 25 },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: { position: 'relative', paddingLeft: 55 },
  active: {
    width: 2,
    height: spacing['5.5'],
    backgroundColor: colors.text.fade,
    position: 'absolute',
    left: 0,
    top: spacing[2],
  },
});
