import { FileSystem, Dirs } from 'react-native-file-access';

/**
 * Clears cache files created by react-native-image-picker.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const clearImagePickerFiles = async () => {
  try {
    const files = await FileSystem.ls(Dirs.CacheDir);

    const targetFiles = files.filter((fileName) =>
      fileName.startsWith('rn_image_picker'),
    );

    for (const fileName of targetFiles) {
      const filePath = `${Dirs.CacheDir}/${fileName}`;
      await FileSystem.unlink(filePath);
    }
  } catch (error) {
    console.error('Error clearing rn_image_picker cache:', error);
  }
};
