import { FileSystem, Dirs } from 'react-native-file-access';
import { DocumentPickerResponse } from '@react-native-documents/picker';
import { clearImagePickerFiles, convertToAssets } from '../image';

// Mock react-native-file-access
jest.mock('react-native-file-access', () => ({
  Dirs: {
    CacheDir: '/mock/cache',
  },
  FileSystem: {
    ls: jest.fn(),
    unlink: jest.fn(),
  },
}));

describe('image utils', () => {
  describe('clearImagePickerFiles', () => {
    const mockFiles = [
      'rn_image_picker_123.jpg',
      'rn_image_picker_temp.png',
      'unrelated_file.txt',
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Should remove only files starting with "rn_image_picker"', async () => {
      (FileSystem.ls as jest.Mock).mockResolvedValue(mockFiles);

      await clearImagePickerFiles();

      expect(FileSystem.ls).toHaveBeenCalledWith(Dirs.CacheDir);
      expect(FileSystem.unlink).toHaveBeenCalledTimes(2);
      expect(FileSystem.unlink).toHaveBeenCalledWith(
        '/mock/cache/rn_image_picker_123.jpg',
      );
      expect(FileSystem.unlink).toHaveBeenCalledWith(
        '/mock/cache/rn_image_picker_temp.png',
      );
    });

    it('Should not call unlink if no matching files found', async () => {
      (FileSystem.ls as jest.Mock).mockResolvedValue(['other_file.txt']);

      await clearImagePickerFiles();

      expect(FileSystem.unlink).not.toHaveBeenCalled();
    });

    it('Should handle errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Mocked error');
      (FileSystem.ls as jest.Mock).mockRejectedValue(error);

      await clearImagePickerFiles();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error clearing rn_image_picker cache:',
        error,
      );

      consoleSpy.mockRestore();
    });
  });

  describe('convertToAssets', () => {
    it('converts only image files to assets', () => {
      const files = [
        {
          uri: 'file://image1.jpg',
          type: 'image/jpeg',
          name: 'image1.jpg',
          size: 1024,
        },
        {
          uri: 'file://doc1.pdf',
          type: 'application/pdf',
          name: 'doc1.pdf',
          size: 2048,
        },
        {
          uri: 'file://image2.png',
          type: 'image/png',
          name: 'image2.png',
          size: 512,
        },
      ] as DocumentPickerResponse[];

      const result = convertToAssets(files);

      expect(result).toEqual([
        {
          uri: 'file://image1.jpg',
          type: 'image/jpeg',
          fileName: 'image1.jpg',
          fileSize: 1024,
        },
        {
          uri: 'file://image2.png',
          type: 'image/png',
          fileName: 'image2.png',
          fileSize: 512,
        },
      ]);
    });

    it('handles missing optional fields with default values', () => {
      const files = [
        {
          type: 'image/jpeg',
        } as DocumentPickerResponse,
      ];

      const result = convertToAssets(files);

      expect(result).toEqual([
        {
          uri: '',
          type: 'image/jpeg',
          fileName: '',
          fileSize: 0,
        },
      ]);
    });

    it('returns empty array if no image types are present', () => {
      const files = [
        {
          uri: 'file://doc.pdf',
          type: 'application/pdf',
          name: 'doc.pdf',
          size: 2048,
        },
      ] as DocumentPickerResponse[];

      const result = convertToAssets(files);
      expect(result).toEqual([]);
    });
  });
});
