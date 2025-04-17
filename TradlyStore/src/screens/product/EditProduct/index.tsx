import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Apis
import { useCreateProductWithImages, useGetProductById } from '@/apis';

// Components
import { FormProduct } from '@/components/shared';

// Constants
import { QUERY_KEY, SCREENS } from '@/constants';

// Stores
import { useAuthStore, useToast } from '@/stores';

// Interfaces
import { ProductFormData, ProductScreenProps } from '@/interfaces';

// Utils
import { getErrorMessage } from '@/utils';

export const EditProduct = ({
  navigation,
  route,
}: ProductScreenProps<typeof SCREENS.EDIT_PRODUCT>) => {
  const queryClient = useQueryClient();

  // Stores
  const showToast = useToast((state) => state.showToast);
  const userId = useAuthStore((state) => state.user.documentId || '');

  // Apis
  const {
    createProductWithImages: updateProduct,
    isLoading,
    error,
  } = useCreateProductWithImages();
  const { data: product, isLoading: isLoadingProduct } = useGetProductById(
    route.params.id || '',
  );

  const handleSubmit = useCallback(
    async (data: ProductFormData) => {
      try {
        await updateProduct({
          product: data,
          id: product?.documentId,
          storeId: userId,
        });

        showToast({
          description: 'Edit product successfully',
          variant: 'success',
        });
        await queryClient.invalidateQueries({
          queryKey: QUERY_KEY.PRODUCT_BY_PARAMS({
            storeId: userId,
          }),
        });
        navigation.navigate(SCREENS.TABS, {
          screen: SCREENS.STORE,
        });
      } catch (err) {
        showToast({
          description: getErrorMessage(error || err),
          variant: 'error',
        });
      }
    },
    [
      error,
      navigation,
      product?.documentId,
      queryClient,
      showToast,
      updateProduct,
      userId,
    ],
  );

  return (
    <FormProduct
      product={product}
      isLoading={isLoading || isLoadingProduct}
      onSubmit={handleSubmit}
    />
  );
};
