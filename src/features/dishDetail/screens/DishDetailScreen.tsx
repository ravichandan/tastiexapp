// screens/DishDetailScreen.tsx
import { ActivityIndicator, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useDishReviews, useDishDetails } from "../hooks/dishDetails.hook";
// import {  } from "../hooks/useDishReviews";
import DishDetailCard from "../components/DishDetailCard";
import ReviewItem from "../components/ReviewItem";
import { RootStackParamList } from "@/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Place } from "@/types/Types";

type Props = NativeStackScreenProps<RootStackParamList, 'DishDetail'>;

export default function DishDetailScreen({ route }: Props) {
  const { placeId, dishId } = route.params;

  const { data: dishData, isLoading: dishLoading } = useDishDetails({placeId, dishId});
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useDishReviews({placeId, dishId});

  if (dishLoading || reviewsLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }
  console.log('Dish detail data, reviewsData:', reviewsData);
  const reviews = reviewsData?.pages.flatMap((page) => page.reviews) ?? [];
console.log('Dish detail data, reviews:', reviews);
  return (
    <>
    {/* <Text>{JSON.stringify(reviews)}</Text>
    <Text>{JSON.stringify(dishData.places.map((place: Place) => {return {id: place._id, name: place.placeName, items: place.items.map(i=> {return {id: i._id, name: i.name}})}}))}</Text> */}
    <DishDetailCard place={dishData.places?.at(0)} />
    <Text>rr{reviews?.length}</Text>
    {/* {reviews?.length && <FlashList
      data={reviews}
      keyExtractor={(item) => item?._id}
      ListHeaderComponent={()=>null}
      renderItem={({ item }) => <ReviewItem review={item} />}

      // ✅ Infinite scroll
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={{ margin: 16 }} />
        ) : null
      }
      // ✅ Pull-to-refresh: handled by hook (auto resets pages)
      refreshing={isRefetching}
      onRefresh={refetch}
    /> } */}
    </>
  );
}
