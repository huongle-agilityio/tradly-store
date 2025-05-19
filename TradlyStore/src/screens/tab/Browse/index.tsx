import { useCallback } from 'react';

// Apis
import { useGetProductByParams } from '@/apis';

// Components
import { ProductListContent } from '@/components/shared';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { BottomTabsScreenProps } from '@/interfaces';

export const Browse = ({
  navigation,
  route: { params },
}: BottomTabsScreenProps<typeof SCREENS.BROWSE>) => {
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
