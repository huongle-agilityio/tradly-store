import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  useWindowDimensions,
  View,
} from 'react-native';

// Apis
import { useGetProduct, useGetProductByParams } from '@/apis';

// Components
import { EmptyList } from '../EmptyList';
import { ListFooter } from '../ListFooter';
import { ProductListItem } from './ProductItem';

// Constants
import { MEDIA_SCREEN } from '@/constants';

// Interfaces
import { Product, ProductFilterParams, SortType } from '@/interfaces';

// Themes
import { spacing } from '@/ui/themes';

interface Props extends Omit<FlatListProps<Product>, 'data' | 'renderItem'> {
  isLoadMore?: boolean;
  hasDiscount?: boolean;
  sortCreatedAt?: SortType;
  params?: ProductFilterParams;
}

export const ListProduct = ({
  isLoadMore = false,
  hasDiscount,
  sortCreatedAt,
  params = {},
  horizontal,
}: Props) => {
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);

  // Apis
  const {
    data: productByParams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingProductByParams,
  } = useGetProductByParams({
    params,
    enabled: isLoadMore,
  });

  const { data: product, isLoading } = useGetProduct({
    hasDiscount,
    sortCreatedAt,
    enabled: !isLoadMore,
  });

  const data = isLoadMore ? productByParams : product;

  const handleEndReached = useCallback(() => {
    // fetch next page
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const keyExtractor = useCallback(
    ({ id }: { id: number }) => id.toString(),
    [],
  );

  // Render
  const listProps = useMemo(
    () => ({
      horizontal,
      data,
      keyExtractor,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: {
        gap: width > MEDIA_SCREEN.TABLET ? 20 : spacing['2.5'],
        minWidth: 330,
        paddingVertical: !horizontal ? spacing[5] : undefined,
      },
      ...(isLoadMore && {
        onEndReached: handleEndReached,
        onEndReachedThreshold: 0.1,
      }),
      ...(!horizontal && {
        numColumns: width > MEDIA_SCREEN.TABLET ? 3 : 2,
        columnWrapperStyle: {
          gap: width > MEDIA_SCREEN.TABLET ? 20 : spacing['2.5'],
        },
      }),
    }),
    [data, handleEndReached, horizontal, isLoadMore, keyExtractor, width],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <ProductListItem
        horizontal={horizontal}
        item={item}
        index={index}
        dataLength={data.length}
      />
    ),
    [data.length, horizontal],
  );

  return (
    <View>
      {isLoadingProductByParams || isLoading ? (
        <ListFooter style={{ height: '100%', justifyContent: 'center' }} />
      ) : null}
      <FlatList
        {...listProps}
        ListEmptyComponent={<EmptyList />}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ListFooter style={{ marginVertical: 20 }} />
          ) : null
        }
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
