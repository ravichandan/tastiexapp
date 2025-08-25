// screens/DishDetailScreen.tsx
import { ActivityIndicator, FlatList, Keyboard, ScrollView, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useDishReviews, useDishDetails } from '../hooks/dishDetails.hook';
// import {  } from "../hooks/useDishReviews";
import DishDetailCard from '../components/DishDetailCard';
import ReviewItem from '../components/ReviewItem';
import { RootStackParamList } from '@/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Place, Review } from '@/types/Types';
import SmoothText from '@/shared/components/SmoothText';
import SearchBar from '@/features/search/screens/SearchBar';
import { useEffect, useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'DishDetail'>;

export default function DishDetailScreen({ route }: Props) {
  const { placeId, dishId } = route.params;
  console.log('in DishDetailScreen');
  console.log(`placeID ${route.params.placeId}, itemId: ${route.params.dishId}`);

  const [searchKey, setSearchKey] = useState('');
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [originalReviews, setOriginalReviews] = useState<Review[]>([]);

  const { data: dishData, isLoading: dishLoading } = useDishDetails({ placeId, dishId });
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
  
//   const { pages, total } = reviewsData as { pageParams: number[]; pages: { reviews: Review[] }[]; total: number };
  useEffect(() => {
  if (!reviewsLoading && reviewsData) {
    // Safe to use reviewsData here
    const { pages } = reviewsData;
    const reviews2 = pages.flatMap((page) => page.reviews) ?? [];
    setOriginalReviews(reviews2);
    setFilteredReviews(reviews2);
  }
}, [reviewsLoading, reviewsData]);
  //     filteredReviews = reviews

//   const reviews2 = pages.flatMap((page) => page.reviews) ?? [];
//   useEffect(() => {
//     setOriginalReviews(reviews2);
//   }, [reviews2]);

//   useEffect(() => {
//     setFilteredReviews(reviews2);
//   }, [reviews2]);
  //   setOriginalReviews(reviews2);

  //   setFilteredReviews(originalReviews);

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
    // clear();
    // setSearchPerformed(false);
    // Keyboard.dismiss();
  };
   const renderReview = ({ item }: { item: Review }) => (
      <View >
        {/* <SmoothText style={styles.itemTitle}>{item.name}</SmoothText> */}
        {/* <SearchItemCard item={item} /> */}
        <Text>Hello</Text>
        {/* {item.restaurant ? <SmoothText style={styles.itemSubtitle}>{item.restaurant}</SmoothText> : null} */}
      </View>
    );
  if (dishLoading || reviewsLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }
  
  return (
    <ScrollView className="flex-1 m-1 border border-gray-300 rounded-lg">
      {/* <Text>{JSON.stringify(reviews)}</Text>
    <Text>{JSON.stringify(dishData.places.map((place: Place) => {return {id: place._id, name: place.placeName, items: place.items.map(i=> {return {id: i._id, name: i.name}})}}))}</Text> */}
        <DishDetailCard place={dishData.places?.at(0)} />


      {/* Reviews block */}
      <View className="m-1">
        <SmoothText className="text-2xl font-bold">Reviews</SmoothText>
        <SearchBar
          onToggleFilters={() => {}}
          value={searchKey}
          onChange={handleChange}
          onSearch={() => {}}
          onClear={handleClear}
          placeHolder="Search"
        />
        {filteredReviews?.length && (
          <View>
            {/* <Text>filteredReviews[0]:- {JSON.stringify(filteredReviews[0])}</Text> */}
            <FlatList
              data={filteredReviews}
              keyExtractor={(item) => item?._id}
              scrollEnabled={false}
            //   ListHeaderComponent={() => null}
            //   renderItem={({ item }) => <Text>   fds </Text>}
            //   renderItem={renderReview}
              renderItem={({ item }) => (<ReviewItem review={item} />)}
              // ✅ Infinite scroll
              onEndReached={() => {
                if (hasNextPage) fetchNextPage();
              }}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={
                    <Text className="text-gray-500 mt-3">No results</Text>
                }
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
