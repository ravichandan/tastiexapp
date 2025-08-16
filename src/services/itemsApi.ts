import { axiosInstance as axios } from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/shared/constants/constants';


export const doGetPopularItems = async (filters: any) => {
  const popularItemsEndpoint = API_ENDPOINTS.POPULAR_ITEMS;
  return axios.get(popularItemsEndpoint, {
    params: {
      distance: 50,
      city: 'sydney',
      suburbs: filters.location?.name || undefined,
      includeSurroundingSuburbs: true,
      cuisines: filters.cuisines.join(',') || undefined,
      dietary: filters.dietary.join(',') || undefined,
    },
  });
};

