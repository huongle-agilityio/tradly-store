import * as v from 'valibot';

// Constants
import { ERROR_MESSAGES, REGEX_EMAIL, REGEX_NAME } from '@/constants';

export const validateRequired = v.string(ERROR_MESSAGES.REQUIRED);

export const validateName = v.pipe(
  validateRequired,
  v.regex(REGEX_NAME, ERROR_MESSAGES.INVALID_NAME),
);

export const validateEmail = v.pipe(
  validateRequired,
  v.regex(REGEX_EMAIL, ERROR_MESSAGES.INVALID_EMAIL),
);
