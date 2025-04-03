import { memo } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// Icons
import { CloseIcon } from '@/ui/icons';

// Themes
import { colors, radius } from '@/ui/themes';

interface ImageUploadProps {
  image: string;
  style?: StyleProp<ImageStyle>;
  onPress: () => void;
}

export const ImageUpload = memo(
  ({ image, style, onPress }: ImageUploadProps) => (
    <View style={styles.container}>
      <Image
        testID="uploaded-image"
        source={{ uri: image }}
        style={[styles.image, style]}
      />
      <TouchableOpacity
        testID="close-button"
        style={styles.closeIcon}
        onPress={onPress}
      >
        <CloseIcon size={9} color={colors.light} />
      </TouchableOpacity>
    </View>
  ),
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
    backgroundColor: colors.placeholder,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -8,
    top: -8,
  },
});
