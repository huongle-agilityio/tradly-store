import { memo } from 'react';
import { View } from 'react-native';

// Components
import { Text } from '@/ui/components';

interface EmptyListProps {
  text?: string;
}

export const EmptyList = memo(
  ({ text = 'No results found.' }: EmptyListProps) => (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: 50,
      }}
    >
      <Text fontSize="md" fontWeight="bold">
        {text}
      </Text>
    </View>
  ),
);

EmptyList.displayName = 'EmptyList';
