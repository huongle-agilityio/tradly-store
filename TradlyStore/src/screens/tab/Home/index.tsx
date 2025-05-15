import { useCallback } from 'react';

// Apis
import { useGetProduct } from '@/apis';

// Components
import { Content } from './components/Content';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { BottomTabsScreenProps } from '@/interfaces';

export const Home = ({
  navigation,
}: BottomTabsScreenProps<typeof SCREENS.HOME>) => {
  // Apis
  const { data: productSorted, isLoading: isLoadingProductSorted } =
    useGetProduct({
      sortCreatedAt: 'desc',
    });

  const { data: productHasDiscount, isLoading: isLoadingProductHasDiscount } =
    useGetProduct({
      hasDiscount: true,
    });

  const handleRedirectNewProduct = useCallback(() => {
    navigation.push(SCREENS.PRODUCT, {
      screen: SCREENS.PRODUCT_LIST,
      params: {
        sortCreatedAt: 'desc',
        name: 'New Product',
      },
    });
  }, [navigation]);

  const handleRedirectPopularProduct = useCallback(() => {
    navigation.push(SCREENS.PRODUCT, {
      screen: SCREENS.PRODUCT_LIST,
      params: {
        hasDiscount: true,
        name: 'Popular Product',
      },
    });
  }, [navigation]);

  const handleRedirectProductCategory = useCallback(
    (name: string, query: string) => {
      navigation.push(SCREENS.PRODUCT, {
        screen: SCREENS.PRODUCT_LIST,
        params: {
          category: query,
          name,
        },
      });
    },
    [navigation],
  );

  const handleNavigateProductDetail = useCallback(
    (id: string) => {
      navigation.push(SCREENS.PRODUCT, {
        screen: SCREENS.PRODUCT_DETAIL,
        params: {
          id,
        },
      });
    },
    [navigation],
  );

  return (
    <Content
      isLoadingProductSorted={isLoadingProductSorted}
      isLoadingProductHasDiscount={isLoadingProductHasDiscount}
      productSorted={productSorted}
      productHasDiscount={productHasDiscount}
      onRedirectNewProduct={handleRedirectNewProduct}
      onRedirectPopularProduct={handleRedirectPopularProduct}
      onRedirectProductCategory={handleRedirectProductCategory}
      onNavigateProductDetail={handleNavigateProductDetail}
    />
  );
};
