import { useCallback } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
  PhotoQuality,
} from 'react-native-image-picker';

// Components
import { Text, ImageUpload } from '@/ui/components';

// Icons
import { PlusIcon } from '@/ui/icons';

// Themes
import { colors, radius, spacing } from '@/ui/themes';

// Utils
import { requestCameraPermission, requestGalleryPermission } from '@/utils';

interface ListProductImageProps {
  selectedImages: Asset[];
  onSelectImage: (images: Asset[]) => void;
}

export const ListProductImage = ({
  selectedImages,
  onSelectImage,
}: ListProductImageProps) => {
  const MAX_IMAGES = 4;
  const hasButtonAddImage = selectedImages.length < MAX_IMAGES;

  /**
   * Deletes an image from the list of selected images by its index.
   *
   * @param {number} index - The index of the image to be deleted.
   */
  const handleDeleteImage = useCallback(
    (index: number) => {
      const updatedImages = selectedImages.filter((_, i) => i !== index);
      onSelectImage(updatedImages);
    },
    [onSelectImage, selectedImages],
  );

  /**
   * Opens the gallery to select up to 4 images. If the user does not
   * have permission to access the gallery, an alert will be shown
   * with a prompt to go to the settings to allow access to the
   * gallery.
   */
  const openGallery = useCallback(async () => {
    const galleryGranted = await requestGalleryPermission();

    if (galleryGranted) {
      const options = {
        mediaType: 'photo' as const,
        selectionLimit: MAX_IMAGES - selectedImages.length,
        includeBase64: false,
        quality: 1 as PhotoQuality,
      };

      // Open the image library to select images
      launchImageLibrary(options, (response) => {
        if (!response.didCancel && response.assets) {
          onSelectImage([
            ...response.assets.slice(0, MAX_IMAGES - selectedImages.length),
            ...selectedImages,
          ]);
        }
      });
    } else {
      Alert.alert(
        'Camera Gallery Needed',
        'To select images, this app requires access to your photo library. Please grant the permission.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Settings', onPress: () => Linking.openSettings() },
        ],
        { cancelable: false },
      );
    }
  }, [onSelectImage, selectedImages]);

  /**
   * Opens the camera app to take a photo. If the user does not
   * have permission to access the camera, an alert will be shown
   * with a prompt to go to the settings to allow access to the
   * camera.
   */
  const openCamera = useCallback(async () => {
    const cameraGranted = await requestCameraPermission();
    if (cameraGranted) {
      const options = {
        mediaType: 'photo' as const,
        includeBase64: false,
        quality: 1 as PhotoQuality,
      };

      // Open the camera to take a photo
      launchCamera(options, (response) => {
        if (!response.didCancel && response.assets) {
          const newImages = response.assets.slice(
            0,
            MAX_IMAGES - selectedImages.length,
          );
          onSelectImage([...newImages, ...selectedImages]);
        }
      });
    } else {
      Alert.alert(
        'Camera Access Needed',
        'To take photos, this app requires access to your camera. Please grant the permission.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Settings', onPress: () => Linking.openSettings() },
        ],
        { cancelable: false },
      );
    }
  }, [onSelectImage, selectedImages]);

  /**
   * Displays an alert with options to open the gallery or camera.
   * The user can choose to select an image from the gallery, take a
   * new photo using the camera, or cancel the action.
   */
  const openGalleryWithCameraOption = useCallback(() => {
    Alert.alert(
      'Please choose an option',
      'Choice images from gallery or camera',
      [
        { text: 'From Gallery', onPress: openGallery },
        { text: 'Take Photo', onPress: openCamera },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  }, [openCamera, openGallery]);

  // Render list item
  const renderItem = useCallback(
    ({ item, index }: { item: Asset; index: number }) => {
      const isFirstItem = index === 0;
      const isLastItem = index === selectedImages.length - 1;

      return (
        <ImageUpload
          id={index}
          image={item.uri || ''}
          onPress={handleDeleteImage}
          styleContainer={[
            isLastItem && styles.lastItem,
            !hasButtonAddImage && isFirstItem && styles.firstItem,
          ]}
        />
      );
    },
    [handleDeleteImage, hasButtonAddImage, selectedImages.length],
  );

  const keyExtractor = useCallback(
    (_: any, index: number) => index.toString(),
    [],
  );

  const listHeaderComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={openGalleryWithCameraOption}
        style={styles.addImage}
      >
        <PlusIcon />
        <Text
          fontWeight="medium"
          color="default"
          textStyle={styles.textOpacity}
        >
          Add photos
        </Text>
        <Text fontSize="xxs" fontWeight="light" textStyle={styles.textOpacity}>
          1600 x 1200 for hi res
        </Text>
      </TouchableOpacity>
    ),
    [openGalleryWithCameraOption],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedImages}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        {...(hasButtonAddImage && {
          ListHeaderComponent: listHeaderComponent,
        })}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text
        fontWeight="light"
        color="placeholder"
        textStyle={[styles.textOpacity, styles.placeholder]}
      >
        Max. 4 photos per product
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing['7.5'],
  },
  contentContainerStyle: {
    gap: 15,
    marginTop: spacing['2.5'],
    paddingRight: spacing['2.5'],
  },
  lastItem: { marginRight: spacing[5] },
  firstItem: { marginLeft: spacing[5] },
  addImage: {
    width: 140,
    height: 108,
    marginLeft: spacing[5],
    borderRadius: radius.lg,
    borderStyle: 'dashed',
    borderWidth: 1,
    opacity: 0.7,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  textOpacity: { opacity: 0.5 },
  placeholder: {
    marginTop: 15,
    marginLeft: spacing[5],
  },
});
