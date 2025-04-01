import { memo } from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// Components
import { Text } from '../Text';

// Themes
import { colors } from '@/ui/themes';

interface CategoryCardProps {
  title: string;
  value: string;
  source: ImageSourcePropType;
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
            <Text
              fontSize="xs"
              color="light"
              fontWeight="medium"
              textStyle={styles.title}
            >
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.categoryCard.background,
  },
  title: { width: '100%', textAlign: 'center' },
});
