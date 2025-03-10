import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Sections
import { ListProduct } from '@/ui/sections';

export const ProductCategory = () => {
  const params = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ListProduct isLoadMore params={params} />
    </View>
  );
};
