import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Apis
import { useCreateProductWithImages } from '@/apis';

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

export const AddProduct = ({
  navigation,
}: ProductScreenProps<typeof SCREENS.ADD_PRODUCT>) => {
  const queryClient = useQueryClient();

  // Stores
  const showToast = useToast((state) => state.showToast);
  const userId = useAuthStore((state) => state.user.documentId || '');

  // Apis
  const { createProductWithImages, isLoading, error } =
    useCreateProductWithImages();

  const handleSubmit = useCallback(
    async (data: ProductFormData) => {
      try {
        await createProductWithImages({
          product: data,
          storeId: userId,
        });

        showToast({
          description: 'Create product successfully',
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
      createProductWithImages,
      error,
      navigation,
      queryClient,
      showToast,
      userId,
    ],
  );

  return <FormProduct isLoading={isLoading} onSubmit={handleSubmit} />;
};
