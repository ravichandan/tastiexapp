// screens/DishDetailScreen.tsx
import { ActivityIndicator, FlatList, StyleSheet, ScrollView, Text, View, useWindowDimensions } from 'react-native';
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
// import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import PlaceDetailCard from '../components/PlaceDetailCard';
import PlaceItem from '../components/PlaceItem';
import { theme } from '@/shared/theme';
import PlaceReviewItem from '../components/PlaceReviewItem';
import { logger } from '@/shared/utils/logger';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetail'>;

// PlaceDetailScreen.whyDidYouRender = true;

export default function PlaceDetailScreen({ route }: Props) {
  const { placeId } = route.params;
  logger.debug('in PlaceDetailScreen');
  logger.debug(`placeID ${route.params.placeId}`);

  // @ts-ignore
  PlaceDetailScreen.whyDidYouRender = true;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchKey, setSearchKey] = useState('');
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [originalReviews, setOriginalReviews] = useState<Review[]>([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [isFetchingReviews, setIsFetchingReviews] = useState(false);
  const [hasNextReviewsPage, setHasNextReviewsPage] = useState(true);
  const [filteredMenu, setFilteredMenu] = useState<Item[]>([]);
  const [originalMenu, setOriginalMenu] = useState<Item[]>([]);
  const [menuPage, setMenuPage] = useState(1);
  const [isFetchingMenu, setIsFetchingMenu] = useState(false);
  const [hasNextMenuPage, setHasNextMenuPage] = useState(true);
  const user = useAuthStore((state) => state.user);
  const { data: place, isLoading: placeLoading } = usePlaceDetails({ placeId });
  // const [tabIndex, setTabIndex] = useState(0);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
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

  // Set originalReviews only when reviewsData changes
  useEffect(() => {
    if (!reviewsLoading && reviewsData) {
      const { pages } = reviewsData;
      const reviews2 = pages.flatMap((page) => page.reviews)?.filter(Boolean) ?? [];
      setOriginalReviews(reviews2);
    }
  }, [reviewsLoading, reviewsData]);

  // Paginate filteredReviews when reviewsPage or originalReviews changes
  useEffect(() => {
    const pageSize = 10;
    const pagedReviews = originalReviews.slice(0, reviewsPage * pageSize);
    setFilteredReviews(pagedReviews);
    setHasNextReviewsPage(pagedReviews.length < originalReviews.length);
  }, [originalReviews, reviewsPage]);

  const fetchNextReviewsPage = () => {
    if (hasNextReviewsPage && !isFetchingReviews) {
      setIsFetchingReviews(true);
      setTimeout(() => {
        setReviewsPage((prev) => prev + 1);
        setIsFetchingReviews(false);
      }, 50); // Simulate network delay
    }
  };

  // Menu pagination logic
  useEffect(() => {
    if (place && place.items) {
      setOriginalMenu(place.items);
    }
  }, [place]);

  // Paginate filteredMenu when menuPage or originalMenu changes
  useEffect(() => {
    const pageSize = 5;
    const pagedItems = originalMenu.slice(0, menuPage * pageSize);
    setFilteredMenu(pagedItems);
    setHasNextMenuPage(pagedItems.length < originalMenu.length);
  }, [originalMenu, menuPage]);

  const fetchNextMenuPage = () => {
    if (hasNextMenuPage && !isFetchingMenu) {
      setIsFetchingMenu(true);
      setTimeout(() => {
        setMenuPage((prev) => prev + 1);
        setIsFetchingMenu(false);
      }, 50); // Simulate network delay
    }
  };

  // logger.debug('Dish detail data, reviews:', filteredReviews);

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
      setFilteredReviews((prev) => prev.map((review) => (review._id === newReview._id ? newReview : review)));
    } else {
      navigation.navigate('Login');
    }
  };
  const renderMenuItem2 = ({ item }: { item: Item }) => (
      <SmoothText>{item.name}</SmoothText>);
  const renderMenuItem = React.useCallback(
    ({ item }: { item: Item }) => (
      // <SmoothText>{item.name}</SmoothText>
      <PlaceItem item={item} onFeedback={feedbackReview} />
    ),
    [feedbackReview],
  );
  const renderReviewItem = React.useCallback(
    ({ item }: { item: Review }) => <PlaceReviewItem review={item} onFeedback={feedbackReview} />,
    [feedbackReview],
  );

  if (placeLoading || reviewsLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <ScrollView className="flex-1 m-1">
      <PlaceDetailCard place={place} onShowMenu={(flag: boolean) => setShowMenu(flag)} />

      {showMenu ? (
        <View className='m-2'>
          <SmoothText className="font-bold text-xl">Our Menu</SmoothText>
          <FlashList
            data={place.items}
            keyExtractor={(item: Item) => item._id}
            renderItem={renderMenuItem}
            removeClippedSubviews={true}
            scrollEnabled={false}
            ListEmptyComponent={
              <SmoothText className="text-slate-500 text-center my-4">No dishes found</SmoothText>
            }
            onEndReached={fetchNextMenuPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingMenu ? <ActivityIndicator style={{ margin: 16 }} /> : null}
          />
        </View>
      ) : (
        <View className='m-2'>
          <FlashList
            data={filteredReviews}
            keyExtractor={(item: Review) => item._id}
            renderItem={renderReviewItem}
            removeClippedSubviews={true}
            scrollEnabled={false}
            ListEmptyComponent={
              <SmoothText className="text-slate-500 text-center my-4">No reviews found</SmoothText>
            }
            onEndReached={fetchNextReviewsPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingReviews ? <ActivityIndicator style={{ margin: 16 }} /> : null}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 3500,
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    backgroundColor: '#fff',
    //  flex: 1
  },
  tabContent: {
    flex: 1,
    // height: '100%',
    // padding: 16,
    // give a sensible minHeight so content shows even if items are few
    // minHeight: 120,
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
