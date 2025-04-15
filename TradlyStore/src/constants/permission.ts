import { PermissionsAndroid } from 'react-native';

export const PERMISSION_TYPES = {
  camera: PermissionsAndroid.PERMISSIONS.CAMERA,
  gallery: PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
};

export const PERMISSION_MESSAGES = {
  camera: {
    denied: 'Camera access denied. Please allow access to your camera.',
    blocked:
      'Camera access blocked. Please enable it manually in app settings.',
    title: 'Camera access',
  },
  gallery: {
    denied: 'Gallery access denied. Please allow access to your photos.',
    blocked:
      'Gallery access blocked. Please enable it manually in app settings.',
    title: 'Gallery access',
  },
};
