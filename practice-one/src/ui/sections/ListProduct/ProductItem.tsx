import { memo, useCallback } from 'react';
import { router } from 'expo-router';

// Components
import { ProductCard } from '@/ui/components';

// Constants
import { SCREEN_ROUTES } from '@/constants';

// Mocks
import { INT_PRODUCT_CARD } from '@/mocks';

// Interfaces
import { Product } from '@/interfaces';

interface ProductListItemProps {
  index: number;
  dataLength: number;
  horizontal?: boolean | null | undefined;
  item: Product;
}

export const ProductListItem = memo(
  ({ horizontal, item, index, dataLength }: ProductListItemProps) => {
    const {
      documentId,
      image,
      title,
      store: { name: storeName, image: storeSource },
      price,
      discount,
    } = item || INT_PRODUCT_CARD;
    const isFirstItem = index === 0;
    const isLastItem = index === dataLength - 1;

    const handleProductDetail = useCallback(() => {
      router.push(SCREEN_ROUTES.PRODUCT_DETAIL(documentId || ''));
    }, [documentId]);

    return (
      <ProductCard
        onPress={handleProductDetail}
        price={price}
        source={image}
        storeName={storeName}
        storeSource={storeSource}
        title={title}
        discount={discount}
        styleWrapper={[
          horizontal && isFirstItem && { marginLeft: 20 },
          horizontal && isLastItem && { marginRight: 20 },
        ]}
      />
    );
  },
);

ProductListItem.displayName = 'ProductListItem';
