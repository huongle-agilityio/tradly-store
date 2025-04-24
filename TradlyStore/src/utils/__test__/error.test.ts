import { errorCodes } from '@react-native-documents/picker';
import { getErrorMessage, getErrorMessageFromDocumentPicker } from '..';

// Constants
import { ERROR_MESSAGES } from '@/constants';

jest.mock('@react-native-documents/picker', () => ({
  errorCodes: {
    OPERATION_CANCELED: 'OPERATION_CANCELED',
    IN_PROGRESS: 'ASYNC_OP_IN_PROGRESS',
    UNABLE_TO_OPEN_FILE_TYPE: 'UNABLE_TO_OPEN_FILE_TYPE',
  },
  isErrorWithCode: (error: any) => typeof error?.code === 'string',
}));

describe('error utils', () => {
  describe('getErrorMessage', () => {
    it('Should return the correct error message', () => {
      const error = new Error('Test error message');
      expect(getErrorMessage(error)).toBe('Test error message');
    });

    it('Should return the error message from an object', () => {
      const error = { message: 'Object error message' };
      expect(getErrorMessage(error)).toBe('Object error message');
    });

    it('Should return the default error message wrong format object', () => {
      const error = { data: 'Some data' };
      expect(getErrorMessage(error)).toBe(ERROR_MESSAGES.DEFAULT_API_ERROR);
    });

    it('Should return the message if it is a string', () => {
      const error = 'String error';
      expect(getErrorMessage(error)).toBe('String error');
    });

    it('Should return the default error message for undefined', () => {
      const error = undefined;
      expect(getErrorMessage(error)).toBe(ERROR_MESSAGES.DEFAULT_API_ERROR);
    });

    it('Should return the default error message for null', () => {
      const error = null;
      expect(getErrorMessage(error)).toBe(ERROR_MESSAGES.DEFAULT_API_ERROR);
    });
  });

  describe('getErrorMessageFromDocumentPicker', () => {
    it('Should returns empty string for OPERATION_CANCELED', () => {
      const error = {
        code: errorCodes.OPERATION_CANCELED,
        message: 'User canceled',
      };
      expect(getErrorMessageFromDocumentPicker(error)).toBe('');
    });

    it('Should returns empty string for IN_PROGRESS', () => {
      const error = {
        code: errorCodes.IN_PROGRESS,
        message: 'Another operation is running',
      };
      expect(getErrorMessageFromDocumentPicker(error)).toBe('');
    });

    it('Should returns specific message for UNABLE_TO_OPEN_FILE_TYPE', () => {
      const error = {
        code: errorCodes.UNABLE_TO_OPEN_FILE_TYPE,
        message: 'Unsupported file',
      };
      expect(getErrorMessageFromDocumentPicker(error)).toBe(
        ERROR_MESSAGES.UNABLE_TO_OPEN_FILE_TYPE,
      );
    });

    it('Should returns error.message for unknown errorCodes', () => {
      const error = { code: 'UNKNOWN_CODE', message: 'Something went wrong' };
      expect(getErrorMessageFromDocumentPicker(error)).toBe(
        'Something went wrong',
      );
    });

    it('Should falls back to getErrorMessage for non-code error', () => {
      const error = { msg: 'Non-standard error' };

      expect(getErrorMessageFromDocumentPicker(error)).toBe(
        ERROR_MESSAGES.DEFAULT_API_ERROR,
      );
    });
  });
});
