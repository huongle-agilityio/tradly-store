import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Href, router } from 'expo-router';

// Constants
import { SCREEN_ROUTES } from '@/constants';

// Components
import { CategoryCard } from '@/ui/components';

// Mocks
import { CATEGORIES } from '@/mocks';

export const Categories = () => {
  const handlePress = useCallback((name: string, query: string) => {
    router.push({
      pathname: SCREEN_ROUTES.CATEGORIES,
      params: { query, name },
    } as unknown as Href);
  }, []);

  return (
    <View style={styles.container}>
      {CATEGORIES.map(({ name, value, image }) => (
        <CategoryCard
          key={`category-card-${name}`}
          value={value}
          title={name}
          source={image}
          onPress={handlePress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
