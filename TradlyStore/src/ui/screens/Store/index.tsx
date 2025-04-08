import { useCallback } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

// Apis
import { useDeleteProduct, useGetProductByParams } from '@/apis';

// Components
import { Text } from '@/ui/components';
import { ListProduct, EmptyStore } from '@/ui/sections';

// Icons
import { PlusCircleIcon } from '@/ui/icons';

// Constants
import { ERROR_MESSAGES, SCREENS } from '@/constants';

// Stores
import { useAuthStore, useToast } from '@/stores';

// Interfaces
import { BottomTabsScreenProps } from '@/interfaces';

// Themes
import { colors } from '@/ui/themes';

export const Store = ({
  navigation,
}: BottomTabsScreenProps<typeof SCREENS.STORE>) => {
  const user = useAuthStore((state) => state.user);
  const showToast = useToast((state) => state.showToast);

  // Apis
  const { mutate } = useDeleteProduct();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetProductByParams({
    params: { storeId: user.documentId },
  });

  const handleEndReached = useCallback(() => {
    // fetch next page
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleNavigateAddProduct = () => {
    navigation.navigate(SCREENS.PRIVATE, {
      screen: SCREENS.PRODUCT_STACK,
      params: {
        screen: SCREENS.FORM_PRODUCT,
        params: {
          title: 'Add Product',
        },
      },
    });
  };

  const handleEditProduct = useCallback(
    (id: string) => {
      navigation.navigate(SCREENS.PRIVATE, {
        screen: SCREENS.PRODUCT_STACK,
        params: {
          screen: SCREENS.FORM_PRODUCT,
          params: {
            title: 'Edit Product',
            id,
          },
        },
      });
    },
    [navigation],
  );

  const handleDeleteSuccess = useCallback(async () => {
    await refetch();
    showToast({
      variant: 'success',
      title: 'Success!',
      description: 'Product deleted successfully',
    });
  }, [refetch, showToast]);

  const handleDeleteFailed = useCallback(() => {
    showToast({
      variant: 'error',
      title: 'Oops, something went wrong!',
      description: ERROR_MESSAGES.DEFAULT_API_ERROR,
    });
  }, [showToast]);

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
            onPress: () =>
              mutate(id, {
                onSuccess: handleDeleteSuccess,
                onError: handleDeleteFailed,
              }),
          },
        ],
        {
          cancelable: true,
        },
      );
    },
    [handleDeleteFailed, handleDeleteSuccess, mutate],
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text fontSize="lg" fontWeight="bold">
          Products
        </Text>
        {!!data.length && (
          <TouchableOpacity onPress={handleNavigateAddProduct}>
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
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        ListEmptyComponent={
          <EmptyStore onAddNewProduct={handleNavigateAddProduct} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 30 },
  titleWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
});
