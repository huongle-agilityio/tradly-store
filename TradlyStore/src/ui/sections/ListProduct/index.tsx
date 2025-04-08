import { memo, useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

// Components
import { EmptyList } from '../EmptyList';
import { ListFooter } from '../ListFooter';
import { ProductListItem } from './ProductItem';

// Hooks
import { useMedia } from '@/hooks';

// Interfaces
import { Product } from '@/interfaces';

// Themes
import { spacing } from '@/ui/themes';

interface RenderItemProps {
  item: Product;
  index: number;
}

interface Props extends Omit<FlatListProps<Product>, 'data' | 'renderItem'> {
  data: Product[];
  isLoading?: boolean;
  isLoadMore?: boolean;
  isFetchingNextPage?: boolean;
  refetch?: () => void;
  onEndReached?: () => void;
  onNavigateProductDetail?: (id: string) => void;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
}

export const ListProduct = memo(
  ({
    data,
    isLoading,
    isFetchingNextPage,
    isLoadMore = false,
    onEndReached,
    horizontal,
    refetch,
    onNavigateProductDetail,
    onEditProduct,
    onDeleteProduct,
    ...props
  }: Props) => {
    const { isTablet, width } = useMedia();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      refetch?.();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, [refetch]);

    const keyExtractor = useCallback(
      (item: Product) => item?.id.toString(),
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
          gap: isTablet ? 20 : spacing['2.5'],
          minWidth: isLoadMore ? 330 : ('100%' as const),
          paddingVertical: !horizontal ? spacing[5] : undefined,
          ...(isLoading && {
            opacity: 0,
            pointerEvents: 'none' as const,
          }),
        },
        ...(isLoadMore && {
          onEndReached,
          onEndReachedThreshold: 0.1,
        }),
        ...(!horizontal && {
          numColumns: 2,
          columnWrapperStyle: {
            justifyContent: 'center' as const,
            gap: isTablet ? 20 : spacing['2.5'],
          },
        }),
      }),
      [
        data,
        horizontal,
        isLoadMore,
        isLoading,
        isTablet,
        keyExtractor,
        onEndReached,
      ],
    );

    const renderItem = useCallback(
      ({ item, index }: RenderItemProps) => (
        <ProductListItem
          horizontal={horizontal}
          item={item}
          index={index}
          style={
            !horizontal && {
              width: Math.round((width - 50) / (listProps?.numColumns ?? 1)),
            }
          }
          hasAction={!onNavigateProductDetail}
          dataLength={data.length}
          onNavigate={onNavigateProductDetail}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
        />
      ),
      [
        data.length,
        horizontal,
        listProps?.numColumns,
        onDeleteProduct,
        onEditProduct,
        onNavigateProductDetail,
        width,
      ],
    );

    return (
      <View>
        {isLoading ? <ListFooter style={styles.loading} /> : null}
        <FlatList
          {...listProps}
          ListEmptyComponent={<EmptyList />}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ListFooter style={styles.loadingNextPage} />
            ) : null
          }
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          {...props}
        />
      </View>
    );
  },
);

ListProduct.displayName = 'ListProduct';

const styles = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  loadingNextPage: { marginVertical: 20 },
});
