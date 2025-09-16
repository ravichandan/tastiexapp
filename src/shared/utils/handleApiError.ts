import { AxiosError } from 'axios';
import { logger } from '@/shared/utils/logger';

// src/shared/utils/handleApiError.ts
export function handleApiError(error: unknown): string {
  logger.debug('in handleApiError, error: ', error);
  if (error instanceof AxiosError) {
    console.error('Error in Axios: ', '' + error.config?.baseURL + error.config?.url);
    return 'Error: ' + error.config?.method + ' ' + error.config?.baseURL + error.config?.url + '. ' + error.message;
  }

  if (error instanceof Error) return error.message;

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as any).message;
  }

  return 'Something went wrong. Please try again.';
}
