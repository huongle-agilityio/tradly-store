import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { Text } from '@/components/common';

interface EmptyListProps {
  text?: string;
}

export const EmptyList = memo(
  ({ text = 'No results found.' }: EmptyListProps) => (
    <View style={styles.container}>
      <Text fontSize="md" fontWeight="bold">
        {text}
      </Text>
    </View>
  ),
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
});
