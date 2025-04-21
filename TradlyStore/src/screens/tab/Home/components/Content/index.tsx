import { memo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

// Components
import { Categories } from '../Categories';
import { ListProduct } from '@/components/shared';
import { Button, Text } from '@/components/common';

// Interfaces
import { Product } from '@/interfaces';

// Themes
import { spacing } from '@/themes';

interface ContentProps {
  isLoadingProductSorted: boolean;
  isLoadingProductHasDiscount: boolean;
  productSorted: Product[];
  productHasDiscount: Product[];
  onRedirectNewProduct: () => void;
  onRedirectPopularProduct: () => void;
  onNavigateProductDetail: (id: string) => void;
  onRedirectProductCategory: (name: string, query: string) => void;
}

export const Content = memo(
  ({
    isLoadingProductSorted,
    isLoadingProductHasDiscount,
    productSorted,
    productHasDiscount,
    onRedirectNewProduct,
    onRedirectPopularProduct,
    onRedirectProductCategory,
    onNavigateProductDetail,
  }: ContentProps) => (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Categories onPress={onRedirectProductCategory} />
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text fontWeight="bold" fontSize="lg" color="placeholder">
              New Product
            </Text>
            <Button
              textSize="xs"
              buttonStyles={styles.button}
              onPress={onRedirectNewProduct}
            >
              See All
            </Button>
          </View>
          <ListProduct
            data={productSorted}
            isLoading={isLoadingProductSorted}
            horizontal={true}
            onNavigateProductDetail={onNavigateProductDetail}
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
              onPress={onRedirectPopularProduct}
            >
              See All
            </Button>
          </View>
          <ListProduct
            data={productHasDiscount}
            isLoading={isLoadingProductHasDiscount}
            horizontal={true}
            onNavigateProductDetail={onNavigateProductDetail}
          />
        </View>
      </View>
    </ScrollView>
  ),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: { gap: spacing[7], marginTop: spacing[4], marginBottom: 90 },
  contentWrapper: { gap: spacing[4] },
  content: {
    paddingHorizontal: spacing[5],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: { width: 90 },
});
