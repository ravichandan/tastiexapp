import { axiosInstance as axios } from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/shared/constants/constants';
import { NewReview } from '@/types/Types';

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

export const doSubmitReview = async (customerId: string, token: string, newReview: any) => {
  console.log('in reviewsApi.ts -> doSubmitReview()');
  const submitReviewEndpoint = API_ENDPOINTS.SUBMIT_REVIEW;//.replace('{reviewId}', reviewId);
  return axios.post(submitReviewEndpoint, newReview, {
      headers: {
          "CUSTOMER_ID": customerId,
          "x-token": token
      }
  });
};

