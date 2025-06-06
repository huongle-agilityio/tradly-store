import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

// Sections
import { ListProduct } from '../ListProduct';

// Interfaces
import { Product } from '@/interfaces';

interface ProductListContentProps {
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  data: Product[];
  refetch: () => void;
  fetchNextPage: () => void;
  onProductDetail: (id: string) => void;
}

export const ProductListContent = ({
  isLoading,
  refetch,
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onProductDetail,
}: ProductListContentProps) => {
  const handleEndReached = useCallback(() => {
    // fetch next page
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleNavigateProductDetail = useCallback(
    (id: string) => {
      onProductDetail(id);
    },
    [onProductDetail],
  );

  return (
    <View style={styles.container}>
      <ListProduct
        isLoadMore
        refetch={refetch}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        data={data}
        onEndReached={handleEndReached}
        onNavigateProductDetail={handleNavigateProductDetail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
