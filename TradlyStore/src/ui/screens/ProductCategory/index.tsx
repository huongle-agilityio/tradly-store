import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { PerformanceMeasureView } from '@shopify/react-native-performance';

// Apis
import { useGetProductByParams } from '@/apis';

// Sections
import { ListProduct } from '@/ui/sections';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { BottomTabsScreenProps, ProductScreenProps } from '@/interfaces';

type ProductCategoryProps =
  | ProductScreenProps<typeof SCREENS.PRODUCT_LIST>
  | BottomTabsScreenProps<typeof SCREENS.BROWSE>;

export const ProductCategory = ({
  navigation,
  route: { params },
}: ProductCategoryProps) => {
  // Apis
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetProductByParams({
    params: params || {},
  });

  const handleEndReached = useCallback(() => {
    // fetch next page
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleNavigateProductDetail = useCallback(
    (id: string) => {
      navigation.push(SCREENS.PRIVATE, {
        screen: SCREENS.PRODUCT_STACK,
        params: {
          screen: SCREENS.PRODUCT_DETAIL,
          params: {
            id,
          },
        },
      });
    },
    [navigation],
  );

  return (
    <PerformanceMeasureView
      interactive={!!data.length}
      screenName={SCREENS.PRODUCT_LIST}
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
