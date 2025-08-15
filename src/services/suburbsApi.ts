import {axiosInstance as axios} from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/shared/constants/constants';

export const fetchSuburbs = async (query?: string) => {
  const { data } = await axios.get(API_ENDPOINTS.SUBURBS, {
    params: { 
      city: 'sydney', // hardcoded for now, adapt as needed
      q: query },
  });
  return data;
};
