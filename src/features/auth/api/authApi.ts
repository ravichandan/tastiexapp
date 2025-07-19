// src/features/auth/api/authApi.ts
import { axiosInstance } from '@/shared/api/axiosInstance';
import { handleApiError } from '@/shared/utils/handleApiError';
import { API_ENDPOINTS } from '@/shared/constants/constants';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export async function loginUser(payload: any): Promise<LoginResponse> {
  try {
    const res = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.LOGIN, payload);
    return res.data;
  } catch (err) {
    throw new Error(handleApiError(err));
  }
}
