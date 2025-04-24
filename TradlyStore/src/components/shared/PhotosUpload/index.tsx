import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { pick } from '@react-native-documents/picker';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
  PhotoQuality,
} from 'react-native-image-picker';

// Components
import { Text, ImageUpload } from '@/components/common';
import { CameraGalleryOptions } from './CameraGalleryOptions';

// Constants
import { PERMISSION_MESSAGES } from '@/constants';

// Icons
import { PlusIcon } from '@/components/icons';

// Interfaces
import { PermissionType } from '@/interfaces';

// Themes
import { colors, radius, spacing } from '@/themes';

// Utils
import {
  convertToAssets,
  getErrorMessageFromDocumentPicker,
  requestPermission,
} from '@/utils';

const ConfirmSheet = lazy(() =>
  import('../ConfirmSheet').then((module) => ({
    default: module.ConfirmSheet,
  })),
);

interface PhotosUploadProps {
  error?: string;
  selectedImages: Asset[];
  onSelectImage: (images: Asset[]) => void;
  onSetError: (error: string) => void;
}

export const PhotosUpload = ({
  error,
  selectedImages,
  onSelectImage,
  onSetError,
}: PhotosUploadProps) => {
  const permissionSheetRef = useRef<BottomSheet>(null);
  const cameraGallerySheetRef = useRef<BottomSheet>(null);
  const [permission, setPermission] = useState<PermissionType>(
    PermissionType.camera,
  );

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

  const handleCloseSettingSheet = useCallback(() => {
    permissionSheetRef.current?.close();
  }, []);

  const handleCloseSheet = useCallback(() => {
    cameraGallerySheetRef.current?.close();
  }, []);

  /**
   * Opens the gallery to select up to 4 images. If the user does not
   * have permission to access the gallery, an alert will be shown
   * with a prompt to go to the settings to allow access to the
   * gallery.
   */
  const openGallery = useCallback(async () => {
    cameraGallerySheetRef.current?.close();
    const galleryGranted = await requestPermission(PermissionType.gallery);

    if (typeof galleryGranted === 'string') {
      setPermission(PermissionType.gallery);
      return permissionSheetRef.current?.snapToIndex(0);
    }

    if (galleryGranted) {
      handleCloseSheet();
      const options = {
        mediaType: 'photo' as const,
        selectionLimit: MAX_IMAGES - selectedImages.length,
        includeBase64: false,
        quality: 1 as PhotoQuality,
      };

      // Open the image library to select images
      launchImageLibrary(options, (response) => {
        if (response.errorMessage) {
          return onSetError(response.errorMessage);
        }

        if (!response.didCancel && response.assets) {
          onSelectImage([
            ...response.assets.slice(0, MAX_IMAGES - selectedImages.length),
            ...selectedImages,
          ]);
        }
      });
    }
  }, [handleCloseSheet, onSelectImage, selectedImages, onSetError]);

  /**
   * Opens the camera app to take a photo. If the user does not
   * have permission to access the camera, an alert will be shown
   * with a prompt to go to the settings to allow access to the
   * camera.
   */
  const handleCamera = useCallback(async () => {
    cameraGallerySheetRef.current?.close();
    const cameraGranted = await requestPermission(PermissionType.camera);

    if (typeof cameraGranted === 'string') {
      setPermission(PermissionType.camera);
      return permissionSheetRef.current?.snapToIndex(0);
    }

    if (cameraGranted) {
      handleCloseSheet();
      const options = {
        mediaType: 'photo' as const,
        includeBase64: false,
        quality: 1 as PhotoQuality,
      };

      // Open the camera to take a photo
      launchCamera(options, (response) => {
        if (response.errorMessage) {
          return onSetError(response.errorMessage);
        }

        if (!response.didCancel && response.assets) {
          const newImages = response.assets.slice(
            0,
            MAX_IMAGES - selectedImages.length,
          );
          onSelectImage([...newImages, ...selectedImages]);
        }
      });
    }
  }, [handleCloseSheet, onSelectImage, selectedImages, onSetError]);

  const handleFiles = useCallback(async () => {
    handleCloseSheet();
    try {
      const pickResult = await pick({
        mode: 'import',
        allowMultiSelection: true,
        allowVirtualFiles: false,
      });
      const images = convertToAssets(pickResult);

      onSelectImage([
        ...images.slice(0, MAX_IMAGES - selectedImages.length),
        ...selectedImages,
      ]);
    } catch (err) {
      onSetError(getErrorMessageFromDocumentPicker(err));
    }
  }, [handleCloseSheet, onSelectImage, onSetError, selectedImages]);

  const handleOpenSheetOptions = useCallback(() => {
    cameraGallerySheetRef.current?.snapToIndex(0);
  }, []);

  const handleOpenPermission = useCallback(() => {
    permissionSheetRef.current?.close();
    Linking.openSettings();
  }, []);

  // Render list item
  const renderItem = useCallback(
    ({ item, index }: { item: Asset; index: number }) => {
      const isFirstItem = index === 0;
      const isLastItem = index === selectedImages.length - 1;
      const image = typeof item === 'string' ? item : item.uri || '';

      return (
        <ImageUpload
          id={index}
          image={image}
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
        accessibilityRole="button"
        onPress={handleOpenSheetOptions}
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
    [handleOpenSheetOptions],
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
      {error && (
        <Text
          color="error"
          fontWeight="light"
          textStyle={[styles.error, styles.placeholder]}
        >
          {error}
        </Text>
      )}
      <Text
        fontWeight="light"
        color="placeholder"
        textStyle={[styles.textOpacity, styles.placeholder]}
      >
        Max. 4 photos per product
      </Text>

      <Suspense fallback={null}>
        <CameraGalleryOptions
          sheetRef={cameraGallerySheetRef}
          onCamera={handleCamera}
          openFiles={handleFiles}
          openGallery={openGallery}
          onCloseSheet={handleCloseSheet}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ConfirmSheet
          title={PERMISSION_MESSAGES[permission].title}
          description={PERMISSION_MESSAGES[permission].blocked}
          buttonConfirmText="Open Settings"
          sheetRef={permissionSheetRef}
          onConfirm={handleOpenPermission}
          onCancel={handleCloseSettingSheet}
        />
      </Suspense>
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
  error: {
    paddingTop: spacing[3],
  },
});
