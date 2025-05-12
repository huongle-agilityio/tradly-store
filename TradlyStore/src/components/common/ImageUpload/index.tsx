import { memo, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// Icons
import { CloseIcon } from '@/components/icons';

// Themes
import { radius } from '@/themes';

interface ImageUploadProps {
  id: number;
  image: string;
  style?: StyleProp<ImageStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  onPress: (id: number) => void;
}

export const ImageUpload = memo(
  ({ id, image, style, styleContainer, onPress }: ImageUploadProps) => {
    const { colors } = useTheme();
    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          closeIcon: {
            backgroundColor: colors.placeholder,
          },
        }),
      [colors.placeholder],
    );

    const handleDelete = () => {
      onPress(id);
    };

    return (
      <View style={[styles.container, styleContainer]}>
        <Image
          accessibilityRole="image"
          testID="uploaded-image"
          source={{ uri: image }}
          style={[styles.image, style]}
          accessibilityLabel="image uploaded"
        />
        <TouchableOpacity
          accessibilityRole="button"
          testID="close-button"
          style={[styles.closeIcon, stylesDynamic.closeIcon]}
          onPress={handleDelete}
        >
          <CloseIcon size={9} color={colors.light} />
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: 140,
    height: 108,
    borderRadius: 8,
  },
  closeIcon: {
    width: 19,
    height: 19,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -8,
    top: -8,
  },
});
