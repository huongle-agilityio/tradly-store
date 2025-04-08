import { getErrorMessage } from '..';

// Constants
import { ERROR_MESSAGES } from '@/constants';

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
