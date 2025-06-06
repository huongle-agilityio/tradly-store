import { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Components
import { Text } from '@/components/common';

// Themes
import { spacing, lineHeights } from '@/themes';

interface PriceDetailsProps {
  total: number;
  totalQuantity: number;
}

export const PriceDetails = memo(
  ({ total, totalQuantity }: PriceDetailsProps) => {
    const { colors } = useTheme();

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          totalWrapper: {
            borderColor: colors.productCard.border,
          },
        }),
      [colors],
    );

    return (
      <View>
        <View style={styles.container}>
          <Text fontWeight="bold" fontSize="lg">
            Price Details
          </Text>

          <View style={styles.wrapper}>
            <View style={styles.textWrapper}>
              <Text textStyle={{ lineHeight: lineHeights.md }}>
                Price (
                {totalQuantity > 1
                  ? `${totalQuantity} items`
                  : `${totalQuantity} item`}
                )
              </Text>
              <Text textStyle={{ lineHeight: lineHeights.md }}>${total}</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text textStyle={{ lineHeight: lineHeights.md }}>
                Delivery Fee
              </Text>
              <Text textStyle={{ lineHeight: lineHeights.md }}>Info</Text>
            </View>
          </View>
        </View>

        <View style={[styles.totalWrapper, stylesDynamic.totalWrapper]}>
          <Text
            fontWeight="bold"
            fontSize="lg"
            textStyle={{ lineHeight: lineHeights.md }}
          >
            Total Amount
          </Text>
          <Text
            fontWeight="bold"
            fontSize="lg"
            textStyle={{ lineHeight: lineHeights.md }}
          >
            ${total}
          </Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[6],
    gap: spacing[5],
  },
  wrapper: {
    gap: spacing['2.5'],
  },
  totalWrapper: {
    paddingTop: spacing[3],
    paddingBottom: spacing[6],
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    borderTopWidth: 0.5,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
