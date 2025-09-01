// src/shared/constants/constants.ts

// export const BASE_URL = 'https://your-api.com/api';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  OIDC_LOGIN: '/customers/code-login',
  SIGNUP: '/signup',
  ITEMS: '/items',
  PLACES: '/places',
  REVIEWS: '/reviews',
  CUISINES: '/cuisines',
  DIETARIES: '/dietaries',
  SUBURB_NAME: '/suburbName',
  SUBURBS: '/suburbs',
  POPULAR_PLACES: '/popular-places',
  POPULAR_ITEMS: '/popular-items',
  PLACE_DETAIL: '/places/{placeId}',//66d6cfd52ad41fb628b9881f?pageSize=5&pageNum=1&fetchMenu=true',
  PLACE_DETAIL_REVIEWS: '/places/{placeId}/reviews',
  PLACE_ITEM_DETAIL: '/places/{placeId}/items/{itemId}',
  PLACE_ITEM_DETAIL_REVIEWS: '/places/{placeId}/items/{itemId}/reviews',
  FEEDBACK_REVIEWS: '/reviews/{reviewId}',
  FETCH_REVIEW_BY_ID: '/reviews/{reviewId}',
  MY_PROFILE: '/users/me',
};
