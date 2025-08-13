import {axiosInstance as axios} from '@/services/axiosInstance';

export const search = async (query: string, filters: any) => {
  const { data } = await axios.get(`/search`, {
    params: { q: query, ...filters },
  });
  return data;
};
