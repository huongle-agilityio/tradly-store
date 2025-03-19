import { memo } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

// Components
import { Text } from '@/ui/components';

// Themes
import { lineHeights } from '@/ui/themes';

interface PriceDetailsProps {
  total: number;
  totalQuantity: number;
}

export const PriceDetails = memo(
  ({ total, totalQuantity }: PriceDetailsProps) => (
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
            <Text textStyle={{ lineHeight: lineHeights.md }}>Delivery Fee</Text>
            <Text textStyle={{ lineHeight: lineHeights.md }}>Info</Text>
          </View>
        </View>
      </View>

      <View style={styles.totalWrapper}>
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
  ),
);

PriceDetails.displayName = 'PriceDetails';
