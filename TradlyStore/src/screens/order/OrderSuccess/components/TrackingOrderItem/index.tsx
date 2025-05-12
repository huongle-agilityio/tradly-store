import { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Components
import { Text } from '@/components/common';

// Themes
import { lineHeights, spacing } from '@/themes';

interface TrackingOrderItemProps {
  date: string;
  title: string;
  description: string;
  time: string;
  isActive?: boolean;
}

export const TrackingOrderItem = memo(
  ({ date, title, description, time, isActive }: TrackingOrderItemProps) => {
    const { colors } = useTheme();

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          active: {
            width: 2,
            height: spacing['5.5'],
            backgroundColor: colors.text.fade,
            position: 'absolute',
            left: 0,
            top: spacing[2],
          },
        }),
      [colors],
    );

    return (
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
          {isActive && <View style={stylesDynamic.active} />}
        </View>
      </View>
    );
  },
);

export const styles = StyleSheet.create({
  container: { paddingVertical: 25 },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: { position: 'relative', paddingLeft: 55 },
});
