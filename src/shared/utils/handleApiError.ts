import { AxiosError } from 'axios';

// src/shared/utils/handleApiError.ts
export function handleApiError(error: unknown): string {
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
