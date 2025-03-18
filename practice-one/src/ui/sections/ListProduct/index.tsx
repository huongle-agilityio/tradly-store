import { memo, useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  useWindowDimensions,
  View,
} from 'react-native';

// Components
import { EmptyList } from '../EmptyList';
import { ListFooter } from '../ListFooter';
import { ProductListItem } from './ProductItem';

// Constants
import { MEDIA_SCREEN } from '@/constants';

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
  onEndReached?: () => void;
}

export const ListProduct = memo(
  ({
    data,
    isLoading,
    isFetchingNextPage,
    isLoadMore = false,
    onEndReached,
    horizontal,
  }: Props) => {
    const { width } = useWindowDimensions();
    const [refreshing, setRefreshing] = useState(false);

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
          onEndReached,
          onEndReachedThreshold: 0.1,
        }),
        ...(!horizontal && {
          numColumns: width > MEDIA_SCREEN.TABLET ? 3 : 2,
          columnWrapperStyle: {
            gap: width > MEDIA_SCREEN.TABLET ? 20 : spacing['2.5'],
          },
        }),
      }),
      [data, horizontal, isLoadMore, keyExtractor, onEndReached, width],
    );

    const renderItem = useCallback(
      ({ item, index }: RenderItemProps) => (
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
        {isLoading ? (
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
  },
);

ListProduct.displayName = 'ListProduct';
