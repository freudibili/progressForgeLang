export const getErrorMessage = (
  error: unknown,
  defaultMessage?: string
): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage ?? 'An unexpected error occurred';
};
