export function getNativeUrl(path: string): string {
  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev
    ? (process.env.NEXT_PUBLIC_NATIVE_URL_DEV ?? 'http://localhost:8081')
    : process.env.NEXT_PUBLIC_NATIVE_URL_PROD;
  return `${baseUrl}${path}`;
}
