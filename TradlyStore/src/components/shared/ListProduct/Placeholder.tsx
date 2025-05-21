import { memo } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

// Components
import { Skeleton } from '@/components/common';

// Themes
import { spacing } from '@/themes';

interface ListFooterProps {
  withItem: number;
  numItems: number;
  horizontal: boolean | null | undefined;
  style?: StyleProp<ViewStyle>;
}

export const Placeholder = memo(
  ({ withItem, style, numItems, horizontal }: ListFooterProps) => (
    <ScrollView
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[horizontal ? styles.row : styles.grid, style]}
    >
      {Array.from({ length: numItems }).map((_, index) => (
        <Skeleton key={`skeleton-${index}`} width={withItem} height={204} />
      ))}
    </ScrollView>
  ),
);

const styles = StyleSheet.create({
  grid: {
    marginTop: spacing[5],
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
});
