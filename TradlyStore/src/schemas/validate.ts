import * as v from 'valibot';

// Constants
import {
  ERROR_MESSAGES,
  REGEX_EMAIL,
  REGEX_NAME,
  REGEX_PHONE_NUMBER,
  REGEX_ZIPCODE,
} from '@/constants';

export const validateRequired = v.string(ERROR_MESSAGES.REQUIRED);

export const validateRequiredArray = v.pipe(
  v.array(v.any(), ERROR_MESSAGES.REQUIRED),
  v.check((input) => input.length > 0, ERROR_MESSAGES.REQUIRED),
);

export const validateName = v.pipe(
  validateRequired,
  v.regex(REGEX_NAME, ERROR_MESSAGES.INVALID_NAME),
);

export const validatePhone = v.pipe(
  validateRequired,
  v.maxLength(10, ERROR_MESSAGES.MAX_PHONE_NUMBER),
  v.regex(REGEX_PHONE_NUMBER, ERROR_MESSAGES.INVALID_PHONE),
);

export const validateEmail = v.pipe(
  validateRequired,
  v.regex(REGEX_EMAIL, ERROR_MESSAGES.INVALID_EMAIL),
);

export const validateZipCode = v.pipe(
  validateRequired,
  v.regex(REGEX_ZIPCODE, ERROR_MESSAGES.INVALID_ZIP_CODE),
);
