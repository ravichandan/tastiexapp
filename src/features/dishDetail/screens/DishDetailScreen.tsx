// screens/DishDetailScreen.tsx
import { ActivityIndicator, FlatList, Keyboard, ScrollView, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useDishReviews, useDishDetails, useFeedbackReview, useFetchReview } from '../hooks/dishDetails.hook';
// import {  } from "../hooks/useDishReviews";
import DishDetailCard from '../components/DishDetailCard';
import ReviewItem from '../components/ReviewItem';
import { RootStackParamList } from '@/navigation/types';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Place, Review } from '@/types/Types';
import SmoothText from '@/shared/components/SmoothText';
import SearchBar from '@/features/search/screens/SearchBar';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/state/useAuthStore';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'DishDetail'>;

export default function DishDetailScreen({ route }: Props) {
  const { placeId, dishId } = route.params;
  console.log('in DishDetailScreen');
  console.log(`placeID ${route.params.placeId}, itemId: ${route.params.dishId}`);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchKey, setSearchKey] = useState('');
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [originalReviews, setOriginalReviews] = useState<Review[]>([]);
  const user = useAuthStore((state) => state.user);
  const { data: dishData, isLoading: dishLoading } = useDishDetails({ placeId, dishId });
  //   const { mutate: giveFeedback } = useFeedbackReview();
  //   const { mutate: giveFeedback } = useFeedbackReview();
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useDishReviews({ placeId, dishId });

  console.log('Dish detail data, reviewsData:', reviewsData);
  useEffect(() => {
    if (!reviewsLoading && reviewsData) {
      // Safe to use reviewsData here
      const { pages } = reviewsData;
      const reviews2 = pages.flatMap((page) => page.reviews)?.filter(Boolean) ?? [];
      setOriginalReviews(reviews2);
      setFilteredReviews(reviews2);
    }
  }, [reviewsLoading, reviewsData]);

  console.log('Dish detail data, reviews:', filteredReviews);

  //   const handleSearch = () => {
  //     const trimmed = searchKey.trim();
  //     if (trimmed) {
  //       Keyboard.dismiss();
  //       performSearch(trimmed);
  //     } else {
  //       clear();
  //       console.warn('Please enter a search query');
  //     }
  //   };

  const handleChange = (text: string) => {
    setSearchKey(text);
    // setFilteredReviews(reviews2.filter((review: Review) => review.customer.name.toLowerCase().includes(searchKey.toLowerCase()) || review.description.toLowerCase().includes(searchKey.toLowerCase())));
    // if (text.trim() === '') clear();
  };

  const handleClear = () => {
    setSearchKey('');
    setFilteredReviews(originalReviews);
  };
  
  const feedbackReview = async ({ reviewId, action }: { reviewId: string; action: string }) => {
    if (user) {
      await useFeedbackReview({ reviewId, customerId: user.id || '', action });
      const newReview = await useFetchReview(reviewId);
      setOriginalReviews((prev) => prev.map((review) => (review._id === newReview._id ? newReview : review)));
      setFilteredReviews((prev) =>
        prev.map((review) => (review._id === newReview._id ? newReview : review)),
      );
    } else {
      navigation.navigate('Login');
    }
  };

  if (dishLoading || reviewsLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <ScrollView className="flex-1 m-1">
      {/* <Text>{JSON.stringify(reviews)}</Text>
    <Text>{JSON.stringify(dishData.places.map((place: Place) => {return {id: place._id, name: place.placeName, items: place.items.map(i=> {return {id: i._id, name: i.name}})}}))}</Text> */}
      <DishDetailCard place={dishData.places?.at(0)} />

      {/* Reviews block */}
      <View className="m-1">
        <SmoothText className="text-2xl font-bold m-1">Reviews</SmoothText>
        <SearchBar
          onToggleFilters={() => {}}
          value={searchKey}
          onChange={handleChange}
          onSearch={() => {}}
          onClear={handleClear}
          placeHolder="Search"
        />

        {filteredReviews?.length && (
          <View className="mt-2">
            {/* <Text>filteredReviews[0]:- {JSON.stringify(filteredReviews[0])}</Text> */}
            <FlatList
              data={filteredReviews}
              extraData={filteredReviews}
              keyExtractor={(item) => item?._id}
              scrollEnabled={false}
              //   ListHeaderComponent={() => null}
              //   renderItem={({ item }) => <Text>   fds </Text>}
              //   renderItem={renderReview}
              renderItem={({ item }) => (<ReviewItem review={item} onFeedback={(args) => feedbackReview(args)} />)}
              // ✅ Infinite scroll
              onEndReached={() => {
                if (hasNextPage) fetchNextPage();
              }}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={<Text className="text-gray-500 mt-3">No results</Text>}
              ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={{ margin: 16 }} /> : null}
              // ✅ Pull-to-refresh: handled by hook (auto resets pages)
              refreshing={isRefetching}
              onRefresh={refetch}
              contentContainerStyle={{ paddingBottom: 24 }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
