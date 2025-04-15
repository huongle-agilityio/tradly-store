import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  GestureResponderEvent,
  PerformanceMeasureView,
  useStartProfiler,
} from '@shopify/react-native-performance';

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
  const route = useRoute();
  const startNavigationTTITimer = useStartProfiler();

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
    (id: string, uiEvent?: GestureResponderEvent) => {
      startNavigationTTITimer({
        source: route.name,
        uiEvent,
      });
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
    [navigation, route.name, startNavigationTTITimer],
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
