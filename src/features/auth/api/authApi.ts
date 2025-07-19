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
  } | any;
  token: string;
}

export interface OidcLoginPayload {
  code: string;
  codeVerifier?: string;
  platform: string;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const res = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.LOGIN, payload);
    return res.data;
  } catch (err) {
    throw new Error(handleApiError(err));
  }
}


export async function oidcLoginUser(payload: OidcLoginPayload): Promise<LoginResponse> {
  try {
    const res = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.OIDC_LOGIN, payload);
    return res.data;
  } catch (err) {
    throw new Error(handleApiError(err));
  }
}
