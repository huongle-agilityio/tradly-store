import { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import {
  GestureResponderEvent,
  PerformanceMeasureView,
  useStartProfiler,
} from '@shopify/react-native-performance';
import { styles } from './styles';

// Apis
import { useGetProduct } from '@/apis';

// Components
import { Button, Text } from '@/ui/components';
import { ListProduct, Categories } from '@/ui/sections';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { BottomTabsScreenProps } from '@/interfaces';

export const Home = ({
  navigation,
}: BottomTabsScreenProps<typeof SCREENS.HOME>) => {
  const startNavigationTTITimer = useStartProfiler();

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
    navigation.push(SCREENS.PRIVATE, {
      screen: SCREENS.PRODUCT_STACK,
      params: {
        screen: SCREENS.PRODUCT_LIST,
        params: {
          sortCreatedAt: 'desc',
          name: 'New Product',
        },
      },
    });
  }, [navigation]);

  const handleRedirectPopularProduct = useCallback(() => {
    navigation.push(SCREENS.PRIVATE, {
      screen: SCREENS.PRODUCT_STACK,
      params: {
        screen: SCREENS.PRODUCT_LIST,
        params: {
          hasDiscount: true,
          name: 'Popular Product',
        },
      },
    });
  }, [navigation]);

  const handleRedirectProductCategory = useCallback(
    (name: string, query: string) => {
      navigation.push(SCREENS.PRIVATE, {
        screen: SCREENS.PRODUCT_STACK,
        params: {
          screen: SCREENS.PRODUCT_LIST,
          params: {
            category: query,
            name,
          },
        },
      });
    },
    [navigation],
  );

  const handleNavigateProductDetail = useCallback(
    (id: string, uiEvent?: GestureResponderEvent) => {
      startNavigationTTITimer({
        source: SCREENS.HOME,
        uiEvent,
      });
      navigation.push(SCREENS.PRIVATE, {
        screen: SCREENS.PRODUCT_STACK,
        params: {
          screen: SCREENS.PRODUCT_DETAIL,
          params: {
            id,
          },
        },
      });
    },
    [navigation, startNavigationTTITimer],
  );

  return (
    <PerformanceMeasureView
      interactive={!!productSorted.length && !!productHasDiscount.length}
      screenName={SCREENS.HOME}
    >
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
                buttonStyles={styles.button}
                onPress={handleRedirectNewProduct}
              >
                See All
              </Button>
            </View>
            <ListProduct
              data={productSorted}
              isLoading={isLoadingProductSorted}
              horizontal={true}
              onNavigateProductDetail={handleNavigateProductDetail}
            />
          </View>

          <View style={styles.contentWrapper}>
            <View style={styles.content}>
              <Text fontWeight="bold" fontSize="lg" color="placeholder">
                Popular Product
              </Text>
              <Button
                textSize="xs"
                buttonStyles={styles.button}
                onPress={handleRedirectPopularProduct}
              >
                See All
              </Button>
            </View>
            <ListProduct
              data={productHasDiscount}
              isLoading={isLoadingProductHasDiscount}
              horizontal={true}
              onNavigateProductDetail={handleNavigateProductDetail}
            />
          </View>
        </View>
      </ScrollView>
    </PerformanceMeasureView>
  );
};
