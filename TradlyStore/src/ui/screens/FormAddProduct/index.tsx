import { useQueryClient } from '@tanstack/react-query';

// Apis
import { useCreateProductWithImages } from '@/apis';

// Components
import { FormProduct } from '@/ui/sections';

// Constants
import { QUERY_KEY, SCREENS } from '@/constants';

// Stores
import { useAuthStore, useToast } from '@/stores';

// Interfaces
import { ProductFormData, ProductScreenProps } from '@/interfaces';

export const FormAddProduct = ({
  navigation,
}: ProductScreenProps<typeof SCREENS.FORM_PRODUCT>) => {
  const queryClient = useQueryClient();

  // Stores
  const showToast = useToast((state) => state.showToast);
  const userId = useAuthStore((state) => state.user.documentId || '');

  // Apis
  const { createProductWithImages, isLoading } = useCreateProductWithImages();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await createProductWithImages(data, userId);
      showToast({
        description: 'Create product successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PRODUCT_BY_PARAMS({
          storeId: userId,
        }),
      });
      navigation.navigate(SCREENS.TABS, {
        screen: SCREENS.STORE,
      });
    } catch (err) {
      showToast({
        description: 'Create product failed',
        variant: 'error',
      });
    }
  };

  return <FormProduct isLoading={isLoading} onSubmit={handleSubmit} />;
};
