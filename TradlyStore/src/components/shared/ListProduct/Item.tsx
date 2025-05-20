import { memo, useCallback } from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { StyleProp, StyleSheet, ViewStyle, ViewToken } from 'react-native';

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
  viewableItems: SharedValue<ViewToken[]>;
  onNavigate?: (id: string) => void;
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
    viewableItems,
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

    const handleProductDetail = useCallback(() => {
      if (!documentId || !onNavigate) {
        return;
      }

      onNavigate(documentId);
    }, [documentId, onNavigate]);

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

    const rStyles = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItems) => viewableItems.item.id === item.id),
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0.5, { duration: 100 }),
        transform: [{ scale: withTiming(isVisible ? 1 : 0.7) }],
      };
    });

    return (
      <Animated.View style={rStyles}>
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
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  firstItem: { marginLeft: 20 },
  lastItem: { marginRight: 20 },
});
