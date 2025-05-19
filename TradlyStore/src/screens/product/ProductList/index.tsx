import { useCallback } from 'react';

// Apis
import { useGetProductByParams } from '@/apis';

// Components
import { ProductListContent } from '@/components/shared';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { ProductScreenProps } from '@/interfaces';

type ProductListContentProps = ProductScreenProps<typeof SCREENS.PRODUCT_LIST>;

export const ProductList = ({
  navigation,
  route: { params },
}: ProductListContentProps) => {
  // Apis
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetProductByParams({
    params: params || {},
  });

  const handleProductDetail = useCallback(
    (id: string) => {
      navigation.push(SCREENS.PRODUCT, {
        screen: SCREENS.PRODUCT_DETAIL,
        params: {
          id,
          product: data?.find((item) => item.documentId === id),
        },
      });
    },
    [data, navigation],
  );

  return (
    <ProductListContent
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      onProductDetail={handleProductDetail}
    />
  );
};
