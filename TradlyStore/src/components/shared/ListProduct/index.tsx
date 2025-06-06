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
import { EmptyList } from '../EmptyList';
import { Placeholder } from './Placeholder';
import { LoadingFooter } from './LoadingFooter';

// Hooks
import { useMedia } from '@/hooks';

// Interfaces
import { Product } from '@/interfaces';

// Themes
import { spacing } from '@/themes';

const ITEM_HEIGHT = 203;
const ITEM_WIDTH = 160;

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
    ListEmptyComponent,
    onEditProduct,
    onDeleteProduct,
    ...props
  }: Props) => {
    const { isTablet, width, height } = useMedia();
    const [refreshing, setRefreshing] = useState(false);
    const viewableItems = useSharedValue<ViewToken[]>([]);

    // Calculate number of columns
    const keyNumColumns = useMemo(
      () => (isTablet ? Math.floor((width - 50 + 20) / (160 + 20)) : 2),
      [isTablet, width],
    );

    const listProps = {
      contentContainerStyle: {
        gap: isTablet ? 20 : spacing['2.5'],
        margin: 'auto' as const,
        ...(!horizontal && {
          paddingTop: spacing[5],
          paddingBottom: spacing[15],
        }),
      },
      ...(isLoadMore && {
        onEndReached,
        onEndReachedThreshold: 0.1,
      }),
      ...(!horizontal && {
        numColumns: keyNumColumns,
        columnWrapperStyle: {
          gap: isTablet ? 20 : spacing['2.5'],
        },
      }),
      ...(horizontal && {
        style: { height: ITEM_HEIGHT },
      }),
    };

    const dynamicStyle = useMemo(
      () =>
        StyleSheet.create({
          placeholder: {
            gap: isTablet ? 20 : 9,
          },
        }),
      [isTablet],
    );

    // Calculate width item base on width
    const withItem = useMemo(
      () =>
        isTablet
          ? 160
          : Math.round((width - 50) / (listProps?.numColumns ?? 1)),
      [isTablet, listProps?.numColumns, width],
    );

    // Number items to render placeholder
    const numItems = useMemo(
      () =>
        horizontal
          ? Math.ceil(width / withItem) + 1
          : Math.ceil(height / ITEM_HEIGHT) * keyNumColumns,
      [height, horizontal, keyNumColumns, width, withItem],
    );

    // Refresh
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

    const getItemLayout = useCallback(
      (_: any, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      }),
      [],
    );

    const renderFooter = useCallback(
      () => (isFetchingNextPage ? <LoadingFooter /> : null),
      [isFetchingNextPage],
    );

    const renderEmptyComponent = useCallback(
      () => (isLoading ? null : ListEmptyComponent ?? <EmptyList />),
      [ListEmptyComponent, isLoading],
    );

    const onViewableItemsChanged = useCallback(
      ({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
        viewableItems.value = vItems;
      },
      [viewableItems],
    );

    // Render
    const renderItem = useCallback(
      ({ item, index }: RenderItemProps) => (
        <Item
          horizontal={horizontal}
          item={item}
          index={index}
          viewableItems={viewableItems}
          hasAction={!onNavigateProductDetail}
          dataLength={data.length}
          onNavigate={onNavigateProductDetail}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
          style={
            !horizontal && {
              width: withItem,
            }
          }
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
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.placeholder}>
            <Placeholder
              horizontal={horizontal}
              numItems={numItems}
              withItem={horizontal ? ITEM_WIDTH : withItem}
              style={dynamicStyle.placeholder}
            />
          </View>
        )}

        <FlatList
          {...listProps}
          key={keyNumColumns}
          horizontal={horizontal}
          data={data}
          keyExtractor={keyExtractor}
          onViewableItemsChanged={onViewableItemsChanged}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent()}
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
  container: { position: 'relative' },
  placeholder: { position: 'absolute' },
});
