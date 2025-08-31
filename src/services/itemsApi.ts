import { axiosInstance as axios } from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/shared/constants/constants';


export const doGetPopularItems = async (filters: any) => {
  const popularItemsEndpoint = API_ENDPOINTS.POPULAR_ITEMS;
  return axios.get(popularItemsEndpoint, {
    params: {
      ...filters,
      distance: 50,
      city: 'sydney',
      suburbs: filters.location?.name || undefined,
      includeSurroundingSuburbs: true,
      cuisines: filters.cuisines.join(',') || undefined,
      dietary: filters.dietary.join(',') || undefined,
      
    },
  }); //pageSize=12&pageNum=2
};


export const doGetDishDetail = async (placeId: string, dishId: string, filters?: any) => {
  console.log('in itemApi.ts -> doGetDishDetail()');
  const placeItemDetailEndpoint = API_ENDPOINTS.PLACE_ITEM_DETAIL.replace('{placeId}', placeId).replace('{itemId}', dishId);
  return axios.get(placeItemDetailEndpoint, {
    params: {
      ...filters,      
    },
  }); //pageSize=12&pageNum=2
};

export const doFeedbackReview = async (reviewId: string, customerId: string, action: string) => {
  console.log('in itemApi.ts -> doFeedbackReview()');
  const feedbackReviewEndpoint = API_ENDPOINTS.FEEDBACK_REVIEWS.replace('{reviewId}', reviewId);
  return axios.put(feedbackReviewEndpoint, {}, {
    headers: {
      "CUSTOMER_ID": customerId,
      "x-action": action,
    },
  });
};

export const doFetchReview = async (reviewId: string) => {
  console.log('in itemApi.ts -> doFetchReview()');
  const fetchReviewEndpoint = API_ENDPOINTS.FETCH_REVIEW_BY_ID.replace('{reviewId}', reviewId);
  return axios.get(fetchReviewEndpoint);
};

export const doGetDishDetailReviews = async (placeId: string, dishId: string, filters?: {pageNum?: number, pageSize?: number}) => {
  const placeItemDetailReviewsEndpoint = API_ENDPOINTS.PLACE_ITEM_DETAIL_REVIEWS.replace('{placeId}', placeId).replace('{itemId}', dishId);
  return axios.get(placeItemDetailReviewsEndpoint, {
    params: {
      ...filters,      
    },
  }); //pageSize=12&pageNum=2
};

