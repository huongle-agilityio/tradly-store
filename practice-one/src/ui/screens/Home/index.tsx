import { Href, router } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';

// Components
import { Button, Text } from '@/ui/components';
import { ListProduct, Categories } from '@/ui/sections';

export const Home = () => {
  const handleRedirectNewProduct = () => {
    router.push({
      pathname: '/products',
      params: { filter: 'popularProduct' },
    } as unknown as Href);
  };

  const handleRedirectPopularProduct = () => {
    router.push({
      pathname: '/products',
      params: { filter: 'popularProduct' },
    } as unknown as Href);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ gap: 28, marginTop: 16, marginBottom: 90 }}>
        <Categories />
        <View style={{ gap: 16 }}>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text fontWeight="bold" fontSize="lg" color="placeholder">
              New Product
            </Text>
            <Button textSize="xs" onPress={handleRedirectNewProduct}>
              See All
            </Button>
          </View>
          <ListProduct hasDiscount horizontal={true} />
        </View>

        <View style={{ gap: 16 }}>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
