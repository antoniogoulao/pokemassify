export const isBrowser = typeof window !== 'undefined';
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

export const isNilOrEmpty = (value: unknown): value is null | undefined => {
  if (value === null || value === undefined) {
    return true;
  }

  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0;
  }

  if (value instanceof Date) {
    return isNaN(value.getTime());
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
};
