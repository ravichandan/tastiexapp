import { axiosInstance as axios } from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/shared/constants/constants';

export const doFeedbackReview = async (reviewId: string, customerId: string, action: string) => {
  console.log('in reviewsApi.ts -> doFeedbackReview()');
  const feedbackReviewEndpoint = API_ENDPOINTS.FEEDBACK_REVIEWS.replace('{reviewId}', reviewId);
  return axios.put(feedbackReviewEndpoint, {}, {
    headers: {
      "CUSTOMER_ID": customerId,
      "x-action": action,
    },
  });
};

export const doFetchReview = async (reviewId: string) => {
  console.log('in reviewsApi.ts -> doFetchReview()');
  const fetchReviewEndpoint = API_ENDPOINTS.FETCH_REVIEW_BY_ID.replace('{reviewId}', reviewId);
  return axios.get(fetchReviewEndpoint);
};

