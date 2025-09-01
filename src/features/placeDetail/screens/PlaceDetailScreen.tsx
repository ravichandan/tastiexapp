// screens/DishDetailScreen.tsx
import { ActivityIndicator, FlatList, StyleSheet, ScrollView, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { usePlaceReviews, usePlaceDetails, useFeedbackReview, useFetchReview } from '../hooks/placeDetails.hook';
// import {  } from "../hooks/useDishReviews";
import DishDetailCard from '../components/PlaceDetailCard';
import ReviewItem from '../components/PlaceReviewItem';
import { RootStackParamList } from '@/navigation/types';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Item, Place, Review } from '@/types/Types';
import SmoothText from '@/shared/components/SmoothText';
import SearchBar from '@/features/search/screens/SearchBar';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/state/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import PlaceDetailCard from '../components/PlaceDetailCard';
import PlaceItem from '../components/PlaceItem';
import { theme } from '@/shared/theme';
import PlaceReviewItem from '../components/PlaceReviewItem';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetail'>;

export default function PlaceDetailScreen({ route }: Props) {
  const { placeId } = route.params;
  console.log('in PlaceDetailScreen');
  console.log(`placeID ${route.params.placeId}`);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchKey, setSearchKey] = useState('');
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [originalReviews, setOriginalReviews] = useState<Review[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<Item[]>([]);
  const [originalMenu, setOriginalMenu] = useState<Item[]>([]);
  const user = useAuthStore((state) => state.user);
  const { data: place, isLoading: placeLoading } = usePlaceDetails({ placeId });
  const [tabIndex, setTabIndex] = React.useState(0);
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
  } = usePlaceReviews({ placeId });

  console.log('Place detail data, reviewsData:', reviewsData);
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

  if (placeLoading || reviewsLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  console.log('Place detail data:', place);
  return (
    <ScrollView className="flex-1 m-1">
      {/* <Text>{JSON.stringify(reviews)}</Text>
    <Text>{JSON.stringify(dishData.places.map((place: Place) => {return {id: place._id, name: place.placeName, items: place.items.map(i=> {return {id: i._id, name: i.name}})}}))}</Text> */}
      <PlaceDetailCard place={place} />

      <View style={styles.container}>
        {/* top search bar - it should update store.searchKey and call runSearch via onSubmit */}
        <TabsProvider defaultIndex={tabIndex} onChangeIndex={setTabIndex}>
          <Tabs
            // simple appearance options:
            uppercase={false}
            showTextLabel
            style={styles.tabs}
            // set primary color via theme prop if needed:
            theme={{ colors: { primary: '#00bcd4' } }}>
            <TabScreen label="Menu">
              <View style={styles.tabContent}>
                {/* <SmoothText>Jeloo{!!JSON.stringify(place)}</SmoothText> */}
                {/* <SmoothText style={styles.itemTitle}>hello places</SmoothText> */}
                {placeLoading ? (
                  <ActivityIndicator style={{ marginTop: 24 }} />
                ) : place.items?.length > 0 ? (
                  <FlashList
                    data={place.items}
                    keyExtractor={(item: Item) => item._id}
                    renderItem={({ item }) => (<PlaceItem item={item} onFeedback={(args) => feedbackReview(args)} />)}
                  />

                  // <FlatList
                  //   data={places.slice(1, 2)} // Limit to first 10 for performance
                  //   keyExtractor={(item, idx) => (item.id ?? idx).toString()}
                  //   renderItem={renderPlace}
                  //   contentContainerStyle={{ paddingBottom: 24 }}
                  // />
                ) : (
                  <SmoothText style={styles.emptyText}>No menu found</SmoothText>
                )}
              </View>
            </TabScreen>

            <TabScreen label="Reviews">
              <View style={styles.tabContent}>
                {/* <SmoothText style={styles.itemTitle}>hello dishes</SmoothText> */}
                {reviewsLoading ? (
                  <ActivityIndicator style={{ marginTop: 24 }} />
                ) : place.reviews?.length > 0 ? (
                  <FlashList
                    data={place.reviews}
                    keyExtractor={(item: Review) => item._id}
                    renderItem={({ item }) => (<PlaceReviewItem review={item} onFeedback={(args) => feedbackReview(args)} />)}
                    contentContainerStyle={{ paddingBottom: 24 }}
                    
                    
                  />
                ) : (
                  <SmoothText style={styles.emptyText}>No reviews yet</SmoothText>
                )}
              </View>
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </View>
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

const styles = StyleSheet.create({
  container: {
    height: 3000,
    // flex: 0,
    backgroundColor: '#fff',
  },
  tabs: {
    backgroundColor: '#fff',
    //  flex: 1
  },
  tabContent: {
    flex: 1,
    padding: 16,
    // give a sensible minHeight so content shows even if items are few
    minHeight: 120,
  },
  item: {
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTitle: {
    fontSize: 16,
    color: '#111',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  emptyText: { textAlign: 'center', paddingVertical: 24, color: '#444' },
});
