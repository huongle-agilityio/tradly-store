import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { Button, Text } from '@/ui/components';

interface EmptyStoreProps {
  onAddNewProduct: () => void;
}

export const EmptyStore = memo(({ onAddNewProduct }: EmptyStoreProps) => (
  <View style={style.container}>
    <View style={style.wrapper}>
      <Text fontSize="lg" fontWeight="medium">
        You don't have product
      </Text>
      <Button
        onPress={onAddNewProduct}
        variant="bordered"
        color="primary"
        buttonStyles={style.button}
      >
        Add Product
      </Button>
    </View>
  </View>
));

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: { gap: 37 },
  button: { height: 48 },
});
