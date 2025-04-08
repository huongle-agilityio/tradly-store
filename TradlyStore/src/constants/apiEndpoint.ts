import { KEY_UPLOAD_IMAGE, UPLOAD_IMAGE_URL } from './envVars';

export const API_ENDPOINT = {
  SIGN_IN: 'auth/local',

  PRODUCT: 'products',
  STORE: 'stores',
  ORDER: 'orders',

  IMAGE: `${UPLOAD_IMAGE_URL}?key=${KEY_UPLOAD_IMAGE}`,
};
