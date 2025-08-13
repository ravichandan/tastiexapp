// src/shared/api/axiosInstance.ts
import axios from 'axios';
// import { BASE_URL } from '@/shared/constants/constants';
import { useAuthStore } from '@/state';
import Constants from 'expo-constants';

export const BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;
export const ENV = Constants.expoConfig?.extra?.env;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
