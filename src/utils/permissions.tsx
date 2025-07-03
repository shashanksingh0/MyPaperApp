// src/utils/permissions.tsx
import { Platform } from 'react-native';
import {
  check,
  request,
  RESULTS,
  Permission,
  PERMISSIONS,
} from 'react-native-permissions';

export const requestMediaPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  let permission: Permission;

  if (Platform.Version >= 33) {
    permission = PERMISSIONS.ANDROID.READ_MEDIA_VIDEO;
  } else {
    permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  }

  try {
    const status = await check(permission);
    if (status === RESULTS.GRANTED) return true;

    const newStatus = await request(permission);
    return newStatus === RESULTS.GRANTED;
  } catch (error) {
    console.warn('Media permission error:', error);
    return false;
  }
};
