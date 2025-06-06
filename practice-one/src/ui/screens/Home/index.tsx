import { useCallback } from 'react';
import { Href, router } from 'expo-router';
import { View, ScrollView } from 'react-native';
import { styles } from './styles';

// Apis
import { useGetProduct } from '@/apis';

// Components
import { Button, Text } from '@/ui/components';
import { ListProduct, Categories } from '@/ui/sections';

// Constants
import { SCREEN_ROUTES } from '@/constants';

export const Home = () => {
  // Apis
  const { data: productSorted, isLoading: isLoadingProductSorted } =
    useGetProduct({
      sortCreatedAt: 'desc',
    });

  const { data: productHasDiscount, isLoading: isLoadingProductHasDiscount } =
    useGetProduct({
      hasDiscount: true,
    });

  const handleRedirectNewProduct = () => {
    router.push({
      pathname: SCREEN_ROUTES.PRODUCT,
      params: {
        sortCreatedAt: 'desc',
        name: 'New Product',
      },
    } as unknown as Href);
  };

  const handleRedirectPopularProduct = () => {
    router.push({
      pathname: SCREEN_ROUTES.PRODUCT,
      params: {
        hasDiscount: true,
        name: 'Popular Product',
      },
    } as unknown as Href);
  };

  const handleRedirectProductCategory = useCallback(
    (name: string, query: string) => {
      router.push({
        pathname: SCREEN_ROUTES.CATEGORIES,
        params: { category: query, name },
      } as unknown as Href);
    },
    [],
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Categories handlePress={handleRedirectProductCategory} />
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text fontWeight="bold" fontSize="lg" color="placeholder">
              New Product
            </Text>
            <Button
              textSize="xs"
              buttonStyles={{ width: 90 }}
              onPress={handleRedirectNewProduct}
            >
              See All
            </Button>
          </View>
          <ListProduct
            data={productSorted}
            isLoading={isLoadingProductSorted}
            horizontal={true}
          />
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text fontWeight="bold" fontSize="lg" color="placeholder">
              Popular Product
            </Text>
            <Button
              textSize="xs"
              buttonStyles={{ width: 90 }}
              onPress={handleRedirectPopularProduct}
            >
              See All
            </Button>
          </View>
          <ListProduct
            data={productHasDiscount}
            isLoading={isLoadingProductHasDiscount}
            horizontal={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};
