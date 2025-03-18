import { useCallback } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Apis
import { useGetProductByParams } from '@/apis';

// Sections
import { ListProduct } from '@/ui/sections';

export const ProductCategory = () => {
  const params = useLocalSearchParams();

  // Apis
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetProductByParams({
      params,
    });

  const handleEndReached = useCallback(() => {
    // fetch next page
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ListProduct
        isLoadMore
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        data={data}
        onEndReached={handleEndReached}
      />
    </View>
  );
};
