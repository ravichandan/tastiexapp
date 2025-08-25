// hooks/useDishReviews.ts
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { doGetDishDetail, doGetDishDetailReviews } from "@/services/itemsApi";

export function useDishReviews(params: {dishId: string, placeId: string}) {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ["dishReviews", params.placeId, params.dishId],
    queryFn: async ({ pageParam = 1 }) => {
      console.log('dishDetails.hook, Fetching dish reviews for', params, 'page', pageParam);
      const res = await doGetDishDetailReviews(params.placeId, params.dishId, { pageNum: pageParam, pageSize: 7 });
      console.log('Dish reviews fetched:', res.data);
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
  });

  
  // ✅ override refetch: clear cached pages before reloading
  const safeRefetch = async () => {
    queryClient.removeQueries({ queryKey: ['dishReviews', params.placeId, params.dishId] });       // clears old pages
    return query.refetch(); // loads page 1
  };

  return { ...query, refetch: safeRefetch };
}

export function useDishDetails(params: {dishId: string, placeId: string}) {
  return useQuery({
    queryKey: ["dishDetail", params.dishId, params.placeId],
    queryFn: () => doGetDishDetail(params.placeId, params.dishId).then(res => res.data),
  });
}