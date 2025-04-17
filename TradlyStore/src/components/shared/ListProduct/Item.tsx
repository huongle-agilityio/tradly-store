import { memo, useCallback } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { GestureResponderEvent } from '@shopify/react-native-performance';

// Components
import { ProductCard } from '@/components/common';

// Mocks
import { INT_PRODUCT_CARD } from '@/mocks';

// Interfaces
import { Product } from '@/interfaces';

interface ItemProps {
  index: number;
  dataLength: number;
  hasAction?: boolean;
  horizontal?: boolean | null | undefined;
  item: Product;
  style?: StyleProp<ViewStyle>;
  onNavigate?: (id: string, uiEvent?: GestureResponderEvent) => void;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
}

export const Item = memo(
  ({
    horizontal,
    item,
    index,
    hasAction,
    dataLength,
    style,
    onNavigate,
    onEditProduct,
    onDeleteProduct,
  }: ItemProps) => {
    const {
      documentId,
      image,
      title,
      store: { username: storeName, image: storeSource },
      price,
      discount,
    } = item || INT_PRODUCT_CARD;
    const isFirstItem = index === 0;
    const isLastItem = index === dataLength - 1;

    const handleProductDetail = useCallback(
      (uiEvent?: GestureResponderEvent) => {
        if (!documentId || !onNavigate) {
          return;
        }

        onNavigate(documentId, uiEvent);
      },
      [documentId, onNavigate],
    );

    const handleEdit = useCallback(() => {
      if (!documentId || onNavigate) {
        return;
      }
      onEditProduct?.(documentId);
    }, [documentId, onEditProduct, onNavigate]);

    const handleDelete = useCallback(() => {
      if (!documentId || onNavigate) {
        return;
      }
      onDeleteProduct?.(documentId);
    }, [documentId, onDeleteProduct, onNavigate]);

    return (
      <ProductCard
        onPress={handleProductDetail}
        hasAction={hasAction}
        onEdit={handleEdit}
        onDelete={handleDelete}
        price={price}
        source={image}
        storeName={storeName}
        storeSource={storeSource}
        title={title}
        discount={discount}
        styleWrapper={[
          horizontal && isFirstItem && styles.firstItem,
          horizontal && isLastItem && styles.lastItem,
          style,
        ]}
      />
    );
  },
);

const styles = StyleSheet.create({
  firstItem: { marginLeft: 20 },
  lastItem: { marginRight: 20 },
});
