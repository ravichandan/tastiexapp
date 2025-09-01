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

export const doGetPlaceDetail = async (placeId: string, filters?: any) => {
  console.log('in placesApi.ts -> doGetPlaceDetail()');
  const placeDetailEndpoint = API_ENDPOINTS.PLACE_DETAIL.replace('{placeId}', placeId);
  return axios.get(placeDetailEndpoint, {
    params: {
      ...filters,
      fetchMenu: true,
    },
  }); //pageSize=12&pageNum=2
};

export const doGetPlaceDetailReviews = async (placeId: string, filters?: { pageNum?: number; pageSize?: number }) => {
  const placeDetailReviewsEndpoint = API_ENDPOINTS.PLACE_DETAIL_REVIEWS.replace('{placeId}', placeId);
  return axios.get(placeDetailReviewsEndpoint, {
    params: {
      ...filters,
    },
  }); //pageSize=12&pageNum=2
};
