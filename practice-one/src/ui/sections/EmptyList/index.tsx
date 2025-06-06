import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { Text } from '@/ui/components';

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

EmptyList.displayName = 'EmptyList';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 50,
  },
});
