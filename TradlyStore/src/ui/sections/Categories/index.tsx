import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { CategoryCard } from '@/ui/components';

// Hooks
import { useMedia } from '@/hooks';

// Mocks
import { CATEGORIES } from '@/mocks';

interface CategoriesProps {
  handlePress: (name: string, query: string) => void;
}

export const Categories = memo(({ handlePress }: CategoriesProps) => {
  const { isTablet, width } = useMedia();

  const cardSize = useMemo(
    () => (isTablet ? width / 8 : width / 4),
    [isTablet, width],
  );

  return (
    <View style={styles.container}>
      {CATEGORIES.map(({ name, value, image }) => (
        <CategoryCard
          key={`category-card-${name}`}
          value={value}
          title={name}
          source={image}
          onPress={handlePress}
          style={{ width: cardSize, height: cardSize }}
        />
      ))}
    </View>
  );
});

Categories.displayName = 'Categories';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
