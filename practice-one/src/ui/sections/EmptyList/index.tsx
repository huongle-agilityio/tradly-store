import { memo } from 'react';
import { View } from 'react-native';

// Components
import { Text } from '@/ui/components';

export const EmptyList = memo(() => (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: 50,
    }}
  >
    <Text fontSize="md" fontWeight="bold">
      No results found.
    </Text>
  </View>
));

EmptyList.displayName = 'EmptyList';
