import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

// Components
import { CategoryCard } from '@/ui/components';

// Mocks
import { CATEGORIES } from '@/mocks';

export const Categories = () => {
  const handlePress = useCallback((name: string, value: string) => {
    router.push(`/category/${name}?query=${value}`);
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
          styleWrapper={{ marginBottom: 5 }}
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
