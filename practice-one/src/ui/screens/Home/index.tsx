import { Href, router } from 'expo-router';
import { View, ScrollView } from 'react-native';
import { styles } from './styles';

// Components
import { Button, Text } from '@/ui/components';
import { ListProduct, Categories } from '@/ui/sections';

// Constants
import { SCREEN_ROUTES } from '@/constants';

export const Home = () => {
  const handleRedirectNewProduct = () => {
    router.push({
      pathname: SCREEN_ROUTES.PRODUCT,
      params: { sortCreatedAt: 'desc', name: 'New Product' },
    } as unknown as Href);
  };

  const handleRedirectPopularProduct = () => {
    router.push({
      pathname: SCREEN_ROUTES.PRODUCT,
      params: { hasDiscount: true, name: 'Popular Product' },
    } as unknown as Href);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Categories />
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text fontWeight="bold" fontSize="lg" color="placeholder">
              New Product
            </Text>
            <Button textSize="xs" onPress={handleRedirectNewProduct}>
              See All
            </Button>
          </View>
          <ListProduct hasDiscount horizontal={true} />
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text fontWeight="bold" fontSize="lg" color="placeholder">
              Popular Product
            </Text>
            <Button textSize="xs" onPress={handleRedirectPopularProduct}>
              See All
            </Button>
          </View>
          <ListProduct sortCreatedAt="desc" horizontal={true} />
        </View>
      </View>
    </ScrollView>
  );
};
