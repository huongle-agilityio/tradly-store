import { memo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ImageBackground } from 'expo-image';

// Components
import { Text } from '../Text';

// Themes
import { colors } from '@/ui/themes';

interface CategoryCardProps {
  title: string;
  source: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const CategoryCard = memo(
  ({ title, source, style, onPress }: CategoryCardProps) => (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        testID="category-card-image"
        source={source}
        alt={`category-${title}`}
      >
        <View style={[styles.container, style]}>
          <Text fontSize="xs" color="light" fontWeight="medium">
            {title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  ),
);

CategoryCard.displayName = 'CategoryCard';

const styles = StyleSheet.create({
  container: {
    width: 93,
    height: 93,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.categoryCard.background,
  },
});
