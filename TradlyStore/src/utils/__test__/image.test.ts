import { FileSystem, Dirs } from 'react-native-file-access';
import { clearImagePickerFiles } from '../image';

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
