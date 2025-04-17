import { View, StyleSheet } from 'react-native';

// Components
import { Text } from '@/components/common';

// Themes
import { colors, radius, spacing } from '@/themes';

export const DeliveryAddress = () => (
  <View style={styles.container}>
    <View style={styles.titleWrapper}>
      <Text fontWeight="medium" fontSize="md" color="quaternary">
        Delivery Address
      </Text>
    </View>

    <View style={styles.textWrapper}>
      <Text fontWeight="normal" color="quaternary">
        Tradly team
      </Text>
      <Text fontSize="sm" fontWeight="normal" color="fade">
        Flat Number 512, Eden Garden, Rewari
      </Text>
      <View style={styles.infoWrapper}>
        <Text fontSize="sm" fontWeight="normal" color="fade">
          Mobile:
        </Text>
        <Text fontSize="sm" fontWeight="normal" color="quaternary">
          9876543210
        </Text>
      </View>
    </View>
  </View>
);

export const styles = StyleSheet.create({
  container: { backgroundColor: colors.light, borderRadius: radius.lg },
  titleWrapper: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing['4.5'],
  },
  textWrapper: {
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing['4.5'],
    gap: spacing[2],
  },
  infoWrapper: { flexDirection: 'row', gap: 5 },
});
