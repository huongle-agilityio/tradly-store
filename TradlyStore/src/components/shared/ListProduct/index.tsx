import { memo, useCallback, useMemo, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';

// Components
import { Item } from './Item';
import { ListFooter } from './Footer';
import { EmptyList } from '../EmptyList';

// Hooks
import { useMedia } from '@/hooks';

// Interfaces
import { Product } from '@/interfaces';

// Themes
import { spacing } from '@/themes';

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
    const viewableItems = useSharedValue<ViewToken[]>([]);

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
    const listProps = {
      contentContainerStyle: {
        gap: isTablet ? 20 : spacing['2.5'],
        paddingVertical: !horizontal ? spacing[5] : undefined,
        margin: 'auto' as const,
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
        numColumns: isTablet ? Math.floor((width - 50 + 20) / (160 + 20)) : 2,
        columnWrapperStyle: {
          gap: isTablet ? 20 : spacing['2.5'],
        },
      }),
    };

    const withItem = useMemo(
      () =>
        isTablet
          ? 160
          : Math.round((width - 50) / (listProps?.numColumns ?? 1)),
      [isTablet, listProps?.numColumns, width],
    );

    const getItemLayout = useCallback(
      (_: any, index: number) => ({
        length: 203,
        offset: 203 * index,
        index,
      }),
      [],
    );

    const renderFooter = useCallback(
      () =>
        isFetchingNextPage ? (
          <ListFooter style={styles.loadingNextPage} />
        ) : null,
      [isFetchingNextPage],
    );

    const renderItem = useCallback(
      ({ item, index }: RenderItemProps) => (
        <Item
          horizontal={horizontal}
          item={item}
          index={index}
          viewableItems={viewableItems}
          style={
            !horizontal && {
              width: withItem,
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
        onDeleteProduct,
        onEditProduct,
        onNavigateProductDetail,
        viewableItems,
        withItem,
      ],
    );

    return (
      <View>
        {isLoading ? <ListFooter style={styles.loading} /> : null}
        <FlatList
          {...listProps}
          horizontal={horizontal}
          data={data}
          keyExtractor={keyExtractor}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems;
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyList />}
          ListFooterComponent={renderFooter}
          initialNumToRender={8} // number of items to render initially
          maxToRenderPerBatch={8} // number of items to render per batch
          updateCellsBatchingPeriod={50} // time in ms to wait before rendering the next batch
          windowSize={5} // number of items to keep in memory outside the viewport
          removeClippedSubviews={true} // unmount components when outside of the viewport
          getItemLayout={getItemLayout}
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

const styles = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  loadingNextPage: { marginVertical: 20 },
});
