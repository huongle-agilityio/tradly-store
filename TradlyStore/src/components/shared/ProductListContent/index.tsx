import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  GestureResponderEvent,
  PerformanceMeasureView,
  useStartProfiler,
} from '@shopify/react-native-performance';

// Sections
import { ListProduct } from '../ListProduct';

// Constants
import { SCREENS } from '@/constants';

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
  const route = useRoute();
  const startNavigationTTITimer = useStartProfiler();

  const handleEndReached = useCallback(() => {
    // fetch next page
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleNavigateProductDetail = useCallback(
    (id: string, uiEvent?: GestureResponderEvent) => {
      startNavigationTTITimer({
        source: route.name,
        uiEvent,
      });
      onProductDetail(id);
    },
    [onProductDetail, route.name, startNavigationTTITimer],
  );

  return (
    <PerformanceMeasureView
      interactive={!!data.length}
      screenName={SCREENS.BROWSE}
    >
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
    </PerformanceMeasureView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
