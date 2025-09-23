// src/features/search/screens/SearchResultsScreen.tsx
import { useEffect } from 'react';
import * as React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, ListRenderItem, ScrollView } from 'react-native';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import { useSearchStore } from '@/state/useSearchStore';
import { useFiltersStore } from '@/state/useFiltersStore';
import { FlashList } from '@shopify/flash-list';
import { Item, Place, PlaceItem } from '@/types/Types';
import SearchPlaceCardOrig from './SearchPlaceCard';
import SmoothText from '@/shared/components/SmoothText';
import { theme } from '@/shared/theme';
import SearchItemCardOrig from './SearchItemCard';
import { useSearch } from '../search/hooks/useSearch';
import { logger } from '@/shared/utils/logger';


// Memoized row components to minimize unnecessary re-renders
const SearchPlaceCard = React.memo(SearchPlaceCardOrig);
const SearchItemCard = React.memo(SearchItemCardOrig);

/**
 * NOTE:
 * - Adjust the paths above to match your project structure.
 * - This example assumes `useSearchStore` provides:
 *    { searchKey, results, loading, runSearch }
 *   and `results` may contain `places` and `dishes` arrays or be a flat list
 *   — adapt the destructuring below if your API returns a different shape.
 */

type SearchResultsScreenProps = {
  query: string;
  // setQuery: (q: string) => void;
};


export default function SearchResultsScreen({ query }: SearchResultsScreenProps) {
  // Add logging to track rerenders and prop changes
  // const query='biryani';
  logger.debug('[SearchResultsScreen] rerender', {
    time: new Date().toISOString(),
    query,
  });

  // Use Zustand selectors to only subscribe to the state SearchResultsScreen needs
  const placesResponse = useSearchStore(state => state.placesResponse);
  const itemsResponse = useSearchStore(state => state.itemsResponse);
  // const searchKey = useSearchStore(state => state.searchKey);
  // const setSearchKey = useSearchStore(state => state.setSearchKey);
  const isLoading = useSearchStore(state => state.isLoading);

  // Always derive places from state, never assign locally
  const places: Place[] = (placesResponse.results ?? []) as Place[];

  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const { searchPlaces, searchItems } = useSearch();

  // runSearch will use the stores' searchKey and selected filters internally
  // Optionally re-run search when searchKey or filters change:
  useEffect(() => {
    // Do not auto-run on every mount if you don't want that — uncomment if desired
    // if (searchKey) runSearch();
  }, []);

  useEffect(() => {
    logger.debug('SearchResultsScreen useEffect - searchKey or query changed:', { 
      // searchKey, 
      query });
    if (query 
      // && searchKey !== query
    ) {
      // setSearchKey(query);
    // }
    // if (query) {
      searchPlaces(query);
      searchItems(query);
    }
  }, [
    // searchKey, 
    query]);

  // Normalize results shape to get two arrays
  // Adapt this to match your backend (this is defensive)
  // const places = (placesResponse.results ?? []) as Place[];
  // const totalPlaces = placesResponse.total || 0;
  const pageNum = placesResponse.pageNum || 1;
  const pageSize =  10;
  logger.debug('places in SearchResultsScreen', places?.length);
  // Lazy load more places when end reached
  const fetchMorePlaces = async () => {
    logger.debug('SearchResultsScreen -> fetchMorePlaces() called isFetchingMore:', isFetchingMore, ' !placesResponse.hasMore', !placesResponse.hasMore);
    if (isFetchingMore) return;
    if (!placesResponse.hasMore) return;
    setIsFetchingMore(true);
    try {
      const nextPage = pageNum + 1;
      await searchPlaces(query, nextPage, pageSize);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Dishes pagination
  // const itemsResponse = useSearchStore(state => state.itemsResponse);
  const dishesPageNum = itemsResponse.pageNum || 1;
  const dishesPageSize = 10;
  const fetchMoreDishes = async () => {
    logger.debug('SearchResultsScreen --> fetchMoreDishes() called isFetchingMore:', isFetchingMore, ' !itemsResponse.hasMore', !itemsResponse.hasMore);
    if (isFetchingMore) return;
    if (!itemsResponse.hasMore) return;
    setIsFetchingMore(true);
    try {
      const nextPage = dishesPageNum + 1;
      await searchItems(query, nextPage, dishesPageSize);
    } finally {
      setIsFetchingMore(false);
    }
  };
  const dishes = (itemsResponse?.results ?? []) as Item[];
  // logger.debug('SearchResultsScreen -> places keys:', places.map(p => p._id));
  logger.debug('SearchResultsScreen -> dishes keys:', dishes.map(d => d._id));

  // Memoize renderPlace and renderDish to prevent unnecessary re-renders
  const renderPlace = React.useCallback(({ item: place }: { item: Place }) => {
    // logger.debug('renderPlace recreated for place._id:', place._id);
    return (
      place.items?.length ? <View style={styles.item}>
        {/* <SmoothText style={styles.itemTitle}>place._id: {place._id}</SmoothText>
        <SmoothText style={styles.itemTitle}>place.items.length: {place.items.length}</SmoothText> */}
        <SearchPlaceCard place={place} />
      </View>
      : null
    );
  }, []);

  const renderDish = React.useCallback(({ item }: { item: Item }) => {
    // logger.debug('renderDish recreated for item._id:', item._id);
    return (
      item.places?.length ? <View style={styles.item}>
        <SearchItemCard item={item}  />
      </View>
      : null
    );
  }, []);

  // const renderDish: ListRenderItem<any> = ({ item }) => (
  //   <View style={styles.item}>
  //     <SmoothText style={styles.itemTitle}>{item.name}</SmoothText>
  //     {item.restaurant ? <SmoothText style={styles.itemSubtitle}>{item.restaurant}</SmoothText> : null}
  //   </View>
  // );

  const [tabIndex, setTabIndex] = React.useState(0);
  return (
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
          <TabScreen label="Places">
            <View style={styles.tabContent}>
              <FlashList
                data={places}
                keyExtractor={(item) => item._id}
                renderItem={renderPlace}
                scrollEnabled={true}
                ListEmptyComponent={
                  <SmoothText className="text-slate-500 text-center my-4">No restaurants found</SmoothText>
                }
                contentContainerStyle={{ paddingBottom: 24 }}
                ListHeaderComponent={<View style={{ height: 0 }} />}
                ListFooterComponent={
                  isLoading
                    ? <ActivityIndicator style={{ margin: 16 }} />
                    : null
                }
                onEndReached={() => fetchMorePlaces()}
                onEndReachedThreshold={0.5}
              />
            </View>
          </TabScreen>

          <TabScreen label="Dishes">
            <View style={styles.tabContent}>
              <FlashList
                data={dishes}
                keyExtractor={(item) => item._id}
                renderItem={renderDish}
                // removeClippedSubviews={true}
                scrollEnabled={true}
                ListEmptyComponent={<SmoothText className="text-slate-500 text-center my-4">No dishes found</SmoothText>}
                contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
                ListHeaderComponent={<View style={{ height: 0 }} />}
                ListFooterComponent={isLoading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
                onEndReached={() => fetchMoreDishes()}
                onEndReachedThreshold={0.9}
              />
            </View>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 500,
    flex: 1,
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
