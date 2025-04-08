import { Asset } from 'react-native-image-picker';
import { useMutation } from '@tanstack/react-query';

// Constants
import { API_ENDPOINT, ERROR_MESSAGES } from '@/constants';

/**
 * Uploads multiple images to the server.
 *
 * @param {Asset[]} files - An array of image files to upload. Each file must include the `uri`,
 * `type`, and optionally `fileName` properties.
 *
 * @returns {Promise<string[]>} - A promise that resolves to an array of URLs for the uploaded images.
 * If any upload fails or the response does not contain valid URLs, the promise will reject with an error.
 *
 * @throws Will throw an error if the API response for any image is not ok or if there is an
 * unexpected API response.
 */
export const uploadImages = async (
  files: Asset[] | string[],
): Promise<string[]> => {
  const urls: string[] = [];

  /**
   * Uploads a single image to the server.
   *
   * @param {Asset} file - The image file to upload. Must include the `uri`,
   * `type`, and optionally `fileName` properties.
   *
   * @returns {Promise<string>} - A promise that resolves to the URL of the
   * uploaded image. If the upload fails or the response does not contain a
   * valid URL, the promise will reject with an error.
   *
   * @throws Will throw an error if the API response is not ok or if there is an
   * unexpected API response.
   */
  const uploadSingleImage = async (file: Asset): Promise<string> => {
    const formData = new FormData();
    formData.append('image', {
      uri: file.uri,
      type: file.type,
      name: file.fileName || 'photo.jpg',
    });

    const response = await fetch(API_ENDPOINT.IMAGE, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.DEFAULT_API_ERROR);
    }

    const data = await response.json();
    if (data?.data?.url) {
      return data.data.url;
    }
    throw new Error('Unexpected API response');
  };

  for (const file of files) {
    if (typeof file === 'string') {
      urls.push(file);
    } else {
      const uploaded = await uploadSingleImage(file);
      urls.push(uploaded);
    }
  }

  return urls;
};

/**
 * A React Query mutation hook to upload one or more images to the server.
 *
 * @returns {UseMutationResult<string[], Error, Asset[]>} - The result of
 * the mutation, including the uploaded images' URLs.
 */
export const useUploadImages = () => {
  return useMutation<string[], Error, Asset[] | string[]>({
    mutationFn: uploadImages,
  });
};
