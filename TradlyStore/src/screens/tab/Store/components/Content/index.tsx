import { lazy, memo, Suspense, useCallback, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

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

const ConfirmSheet = lazy(() =>
  import('@/components/shared/ConfirmSheet').then((module) => ({
    default: module.ConfirmSheet,
  })),
);

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
    const [id, setId] = useState<string>('');
    const sheetRef = useRef<BottomSheet>(null);

    const handleCloseSheet = useCallback(() => {
      sheetRef.current?.close();
    }, []);

    const handleOpenSheetOptions = useCallback(() => {
      sheetRef.current?.snapToIndex(0);
    }, []);

    const handleEndReached = useCallback(() => {
      // fetch next page
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const handleDeleteProduct = useCallback(
      (id: string) => {
        setId(id);
        handleOpenSheetOptions();
      },
      [handleOpenSheetOptions],
    );

    const handleConfirmDeleteProduct = useCallback(() => {
      onDelete(id);
      handleCloseSheet();
    }, [handleCloseSheet, id, onDelete]);

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

        <Suspense fallback={null}>
          <ConfirmSheet
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            buttonConfirmText="Confirm"
            sheetRef={sheetRef}
            onConfirm={handleConfirmDeleteProduct}
            onCancel={handleCloseSheet}
          />
        </Suspense>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 30 },
  titleWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
});
