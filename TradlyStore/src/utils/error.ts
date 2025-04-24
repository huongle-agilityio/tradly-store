import { errorCodes, isErrorWithCode } from '@react-native-documents/picker';

// Constants
import { ERROR_MESSAGES } from '@/constants';

/**
 * Gets the error message from an error object or instance.
 *
 * @param {any} error
 * @returns {string} The error message.
 */
export const getErrorMessage = (error: any): string => {
  switch (true) {
    case error instanceof Error:
      return error.message;

    case error && typeof error === 'object' && 'message' in error:
      return error.message;

    case typeof error === 'string':
      return error;

    default:
      return ERROR_MESSAGES.DEFAULT_API_ERROR;
  }
};

/**
 * Gets the error message from an error object or instance that is returned
 * by the @react-native-documents/picker package.
 *
 * @param {any} error - The error object or instance.
 * @returns {string} The error message.
 */
export const getErrorMessageFromDocumentPicker = (error: any) => {
  if (isErrorWithCode(error)) {
    switch (error.code) {
      case errorCodes.IN_PROGRESS:
      case errorCodes.OPERATION_CANCELED:
        return '';
      case errorCodes.UNABLE_TO_OPEN_FILE_TYPE:
        return ERROR_MESSAGES.UNABLE_TO_OPEN_FILE_TYPE;
      default:
        return error.message;
    }
  } else {
    return getErrorMessage(error);
  }
};
