import { useCallback, useEffect } from 'react';
import { useStartProfiler } from '@shopify/react-native-performance';

// Apis
import { useGetProductById } from '@/apis';

// Components
import { Content } from './components/Content';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { ProductScreenProps } from '@/interfaces';

// Stores
import { useCartStore, useToast } from '@/stores';

// Utils
import { isEmptyObject } from '@/utils';

export const ProductDetail = ({
  navigation,
  route,
}: ProductScreenProps<typeof SCREENS.PRODUCT_DETAIL>) => {
  const startNavigationTTITimer = useStartProfiler();
  const { id } = route.params;

  // Stores
  const showToast = useToast((state) => state.showToast);
  const addNewCart = useCartStore((state) => state.addNewCart);

  // Apis
  const { data, isLoading } = useGetProductById(id);
  const {
    documentId = '',
    slideImages = [],
    image = '',
    title = '',
    quantity = 0,
    price = 0,
    description,
    store,
    discount,
    priceType = '',
    location = '',
    category = '',
  } = data || {};

  const handleAddToCart = useCallback(() => {
    addNewCart({
      id: documentId,
      name: title,
      image,
      price,
      discount,
      quantity: 1,
    });
    showToast({ description: 'Added to cart', variant: 'success' });
  }, [addNewCart, discount, documentId, image, price, showToast, title]);

  const handleBack = useCallback(() => {
    startNavigationTTITimer({
      source: SCREENS.PRODUCT_DETAIL,
    });
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(SCREENS.TABS, {
        screen: SCREENS.HOME,
      });
    }
  }, [navigation, startNavigationTTITimer]);

  useEffect(() => {
    if (!isLoading && isEmptyObject(data)) {
      navigation.navigate(SCREENS.TABS, {
        screen: SCREENS.HOME,
      });
    }
  }, [data, isLoading, navigation]);

  return (
    <Content
      priceType={priceType}
      category={category}
      location={location}
      slideImages={slideImages}
      title={title}
      quantity={quantity}
      price={price}
      data={data}
      isLoading={isLoading}
      handleAddToCart={handleAddToCart}
      handleBack={handleBack}
      description={description}
      discount={discount}
      store={store}
    />
  );
};
