import { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

// Components
import { Text } from '@/components/common';

// Themes
import { radius, spacing } from '@/themes';

export const DeliveryAddress = () => {
  const { colors } = useTheme();

  const stylesDynamic = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.backgroundSecondary,
          borderRadius: radius.lg,
        },
        textWrapper: {
          borderTopWidth: 1,
          borderColor: colors.border,
          paddingVertical: spacing[3],
          paddingHorizontal: spacing['4.5'],
          gap: spacing[2],
        },
      }),
    [colors],
  );

  return (
    <View style={stylesDynamic.container}>
      <View style={styles.titleWrapper}>
        <Text fontWeight="medium" fontSize="md" color="quaternary">
          Delivery Address
        </Text>
      </View>

      <View style={stylesDynamic.textWrapper}>
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
};

export const styles = StyleSheet.create({
  titleWrapper: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing['4.5'],
  },
  infoWrapper: { flexDirection: 'row', gap: 5 },
});
