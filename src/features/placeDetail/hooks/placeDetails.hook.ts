// hooks/useDishReviews.ts
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { doGetPlaceDetail, doGetPlaceDetailReviews } from "@/services/placesApi";
import { doFeedbackReview, doFetchReview } from "@/services/reviewsApi";
import { logger } from '@/shared/utils/logger';

export function usePlaceReviews(params: {placeId: string}) {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ["placeReviews", params.placeId],
    queryFn: async ({ pageParam = 1 }) => {
      logger.debug('placeDetails.hook, Fetching place reviews for', params, 'page', pageParam);
      const res = await doGetPlaceDetailReviews(params.placeId, { pageNum: pageParam, pageSize: 7 });
      logger.debug('Place reviews fetched:', res.data);
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // ✅ backend should return hasMore or totalPages
      if (lastPage.hasMore) { 
        return allPages.length + 1;
      }
      return undefined;
    },
  }
);
  
  // ✅ override refetch: clear cached pages before reloading
  const safeRefetch = async () => {
    queryClient.removeQueries({ queryKey: ['placeReviews', params.placeId] }); // clears old pages
    return query.refetch(); // loads page 1
  };

  return { ...query, refetch: safeRefetch };
}

export function usePlaceDetails(params: {placeId: string}) {
  return useQuery({
    queryKey: ["placeDetail", params.placeId],
    queryFn: () => doGetPlaceDetail(params.placeId).then(res => res.data),
  });
}

export function useFetchReview(reviewId: string) {
  return doFetchReview(reviewId).then(res => res.data)
}

export function useFeedbackReview(params: {reviewId: string, customerId: string, action: string}) {
  return doFeedbackReview(params.reviewId, params.customerId, params.action);//.then(res => res.data);
}