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
  value: string;
  source: string;
  styleWrapper?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  onPress: (name: string, value: string) => void;
}

export const CategoryCard = memo(
  ({
    title,
    value,
    source,
    style,
    styleWrapper,
    onPress,
  }: CategoryCardProps) => {
    const handlePress = () => {
      onPress(title, value);
    };

    return (
      <TouchableOpacity
        testID="category-card"
        onPress={handlePress}
        style={styleWrapper}
      >
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
    );
  },
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
