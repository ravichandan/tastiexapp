import { axiosInstance as axios } from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/shared/constants/constants';
import { NewReview } from '@/types/Types';
import { useAuthStore } from '@/state/useAuthStore';

export const doFeedbackReview = async (reviewId: string, customerId: string, action: string) => {
  console.log('in reviewsApi.ts -> doFeedbackReview()');
  const feedbackReviewEndpoint = API_ENDPOINTS.FEEDBACK_REVIEWS.replace('{reviewId}', reviewId);
  const token = useAuthStore.getState().token;
  console.log('in reviewsApi.ts -> doFeedbackReview(), token: ', token);
  return axios.put(feedbackReviewEndpoint, {}, {
    headers: {
      "CUSTOMER_ID": customerId,
      "x-action": action,
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });
};

export const doFetchReview = async (reviewId: string) => {
  console.log('in reviewsApi.ts -> doFetchReview()');
  const fetchReviewEndpoint = API_ENDPOINTS.FETCH_REVIEW_BY_ID.replace('{reviewId}', reviewId);
  // const token = useAuthStore.getState().token;
  return axios.get(fetchReviewEndpoint);
};

export const doSubmitReview = async (customerId: string, _token: string, newReview: any) => {
  console.log('in reviewsApi.ts -> doSubmitReview()');
  const submitReviewEndpoint = API_ENDPOINTS.SUBMIT_REVIEW;
  const token = useAuthStore.getState().token;
  console.log('in reviewsApi.ts -> doSubmitReview(), token: ', token);
  return axios.post(submitReviewEndpoint, newReview, {
    headers: {
      "CUSTOMER_ID": customerId,
      ...(token ? { "x-token": token, "Authorization": `Bearer ${token}` } : {}),
    }
  });
};

