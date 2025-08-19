import { axiosInstance as axios } from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/shared/constants/constants';


export const doGetPopularPlaces = async (filters: any) => {
  const popularPlacesEndpoint = API_ENDPOINTS.POPULAR_PLACES;
  return axios.get(popularPlacesEndpoint, {
    params: {
      ...filters,
      distance: 50,
      city: 'sydney',
      suburbs: filters.location?.name || undefined,
      includeSurroundingSuburbs: true,
      cuisines: filters.cuisines.join(',') || undefined,
      dietary: filters.dietary.join(',') || undefined,
    },
  });
};

