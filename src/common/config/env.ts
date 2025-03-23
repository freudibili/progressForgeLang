const isDevelopment = process.env.NODE_ENV === 'development';

export const WEB_URL = isDevelopment
  ? process.env.EXPO_PUBLIC_WEB_URL_DEV
  : process.env.EXPO_PUBLIC_WEB_URL_PROD;

export const getWebUrl = (path: string): string => `${WEB_URL}${path}`;
