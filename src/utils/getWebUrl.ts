export function getWebUrl(path: string): string {
  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev
    ? process.env.EXPO_PUBLIC_WEB_URL_DEV
    : process.env.EXPO_PUBLIC_WEB_URL_PROD;
  return `${baseUrl}${path}`;
}
