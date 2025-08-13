import { API_ENDPOINTS } from '@/shared/constants/constants';
import {axiosInstance as axios} from './axiosInstance'; // your configured Axios instance

export const fetchCuisines = async () => {
  const response = await axios.get(API_ENDPOINTS.CUISINES);
  return response.data;
};

export const fetchDietaryOptions = async () => {
  const response = await axios.get(API_ENDPOINTS.DIETARIES);
  return response.data;
};
