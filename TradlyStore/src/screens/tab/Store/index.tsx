import { useCallback } from 'react';

// Apis
import { useDeleteProduct, useGetProductByParams } from '@/apis';

// Components
import { Content } from './components/Content';

// Constants
import { ERROR_MESSAGES, SCREENS } from '@/constants';

// Stores
import { useAuthStore, useToast } from '@/stores';

// Interfaces
import { BottomTabsScreenProps } from '@/interfaces';

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

  const handleNavigateAddProduct = useCallback(() => {
    navigation.navigate(SCREENS.PRODUCT, {
      screen: SCREENS.ADD_PRODUCT,
    });
  }, [navigation]);

  const handleEditProduct = useCallback(
    (id: string) => {
      navigation.navigate(SCREENS.PRODUCT, {
        screen: SCREENS.EDIT_PRODUCT,
        params: {
          id,
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

  const handleDelete = useCallback(
    (id: string) => {
      mutate(id, {
        onSuccess: handleDeleteSuccess,
        onError: handleDeleteFailed,
      });
    },
    [handleDeleteFailed, handleDeleteSuccess, mutate],
  );

  return (
    <Content
      data={data}
      onDelete={handleDelete}
      onNavigateAddProduct={handleNavigateAddProduct}
      onEditProduct={handleEditProduct}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
};
