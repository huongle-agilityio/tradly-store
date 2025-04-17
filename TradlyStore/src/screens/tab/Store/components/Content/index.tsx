import { memo, useCallback } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { Text } from '@/components/common';
import { EmptyContent } from '../EmptyContent';
import { ListProduct } from '@/components/shared';

// Icons
import { PlusCircleIcon } from '@/components/icons';

// Interfaces
import { Product } from '@/interfaces';

// Themes
import { colors } from '@/themes';

interface ContentProps {
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  data: Product[];
  refetch: () => void;
  fetchNextPage: () => void;
  onDelete: (id: string) => void;
  onNavigateAddProduct: () => void;
  onEditProduct: (id: string) => void;
}

export const Content = memo(
  ({
    onNavigateAddProduct,
    onEditProduct,
    onDelete,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  }: ContentProps) => {
    const handleEndReached = useCallback(() => {
      // fetch next page
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const handleDeleteProduct = useCallback(
      (id: string) => {
        Alert.alert(
          'Delete Product',
          'Are you sure you want to delete this product?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => onDelete(id),
            },
          ],
          {
            cancelable: true,
          },
        );
      },
      [onDelete],
    );

    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text fontSize="lg" fontWeight="bold">
            Products
          </Text>
          {!!data.length && (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={onNavigateAddProduct}
            >
              <PlusCircleIcon color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        <ListProduct
          data={data}
          isLoadMore
          refetch={refetch}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          onEndReached={handleEndReached}
          onEditProduct={onEditProduct}
          onDeleteProduct={handleDeleteProduct}
          ListEmptyComponent={
            <EmptyContent onAddNewProduct={onNavigateAddProduct} />
          }
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 30 },
  titleWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
});
