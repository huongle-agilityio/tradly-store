import { memo, useMemo } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
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
    const { colors } = useTheme();

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          container: {
            backgroundColor: colors.categoryCard.background,
          },
        }),
      [colors.categoryCard.background],
    );

    const handlePress = () => {
      onPress(title, value);
    };

    return (
      <Animated.View entering={FadeIn.duration(500)}>
        <TouchableOpacity
          accessibilityRole="button"
          testID="category-card"
          onPress={handlePress}
          style={styleWrapper}
        >
          <ImageBackground
            accessibilityRole="image"
            testID="category-card-image"
            source={source}
            accessibilityLabel={`image of ${title} category`}
          >
            <View style={[styles.container, style, stylesDynamic.container]}>
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
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { width: '100%', textAlign: 'center' },
});
