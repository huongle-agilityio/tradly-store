import { useCallback, useMemo } from 'react';
import { FlatList, FlatListProps } from 'react-native';

// Apis
import { useGetProduct, useGetProductByParams } from '@/apis';

// Components
import { EmptyList } from '../EmptyList';
import { ListFooter } from '../ListFooter';
import { ProductListItem } from './ProductItem';

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

  // Render
  const listProps = useMemo(
    () => ({
      horizontal,
      data,
      keyExtractor: ({ id }: { id: number }) => id.toString(),
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: {
        gap: spacing['2.5'],
        minWidth: 330,
        paddingVertical: !horizontal ? spacing[5] : undefined,
      },
      ...(isLoadMore && {
        onEndReached: handleEndReached,
        onEndReachedThreshold: 0.1,
      }),
      ...(!horizontal && {
        numColumns: 2,
        columnWrapperStyle: { gap: spacing['2.5'] },
      }),
    }),
    [data, handleEndReached, horizontal, isLoadMore],
  );

  return isLoadingProductByParams || isLoading ? (
    <ListFooter style={{ height: '100%', justifyContent: 'center' }} />
  ) : (
    <FlatList
      {...listProps}
      ListEmptyComponent={<EmptyList />}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ListFooter style={{ marginVertical: 20 }} />
        ) : null
      }
      renderItem={({ item, index }) => (
        <ProductListItem
          horizontal={horizontal}
          item={item}
          index={index}
          dataLength={data.length}
        />
      )}
    />
  );
};
