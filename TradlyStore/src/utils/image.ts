import { Asset } from 'react-native-image-picker';
import { FileSystem, Dirs } from 'react-native-file-access';
import { DocumentPickerResponse } from '@react-native-documents/picker';

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

/**
 * Converts an array of DocumentPickerResponse objects to an array of
 * Asset objects.
 * Only objects with a type that includes 'image/' will be included in the
 * output array.
 *
 * @param {DocumentPickerResponse[]} files - An array of document picker
 *   responses.
 *
 * @returns {Asset[]} - An array of Assets created from the input array.
 */
export const convertToAssets = (files: DocumentPickerResponse[]): Asset[] =>
  files
    .filter((file) => file.type?.includes('image/'))
    .map((file) => ({
      uri: file.uri || '',
      type: file.type || '',
      fileName: file.name || '',
      fileSize: file.size || 0,
    }));
