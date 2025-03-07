import { FlatList, FlatListProps } from 'react-native';

// Apis
import { useGetProduct } from '@/apis';

// Components
import { ProductCard } from '@/ui/components';

// Interfaces
import { Product, SortType } from '@/interfaces';

interface Props extends Omit<FlatListProps<Product>, 'data' | 'renderItem'> {
  hasDiscount?: boolean;
  sortCreatedAt?: SortType;
}

export const ListProduct = ({
  hasDiscount,
  sortCreatedAt,
  horizontal,
}: Props) => {
  const { data } = useGetProduct({
    hasDiscount,
    sortCreatedAt,
  });

  return (
    <FlatList
      horizontal={horizontal}
      data={data}
      {...(!horizontal && { numColumns: 2 })}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({
        item: {
          title,
          image,
          price,
          discount,
          store: { name, image: storeImage },
        },
        index,
      }) => {
        const isFirstItem = index === 0;
        const isLastItem = index === data.length - 1;

        return (
          <ProductCard
            onPress={() => {}}
            price={price}
            source={image}
            storeName={name}
            storeSource={storeImage}
            title={title}
            discount={discount}
            styleWrapper={[
              horizontal && isFirstItem && { marginLeft: 20 },
              horizontal && isLastItem && { marginRight: 20 },
            ]}
          />
        );
      }}
    />
  );
};
