// src/features/home/screens/PopularPlacesScreen.tsx
import { useEffect, useState } from 'react';
import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  ListRenderItem,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import { useSearchStore } from '@/state/useSearchStore';
import { useFiltersStore } from '@/state/useFiltersStore';
import { FlashList } from '@shopify/flash-list';
import { Item, Place, PlaceItem } from '@/types/Types';
import SearchPlaceCard from './PopularPlaceCard';
import SmoothText from '@/shared/components/SmoothText';
import { theme } from '@/shared/theme';
// import SearchItemCard from './SearchItemCard';
import { usePopularsStore } from '@/state/usePopularsStore';
import { useHomeHook } from '../hooks/home.hook';
import PopularPlaceCard from './PopularPlaceCard';
import PopularItemCard from './PopularItemCard';
import TxButton from '@/shared/components/TxButton';
import { ChevronDown } from 'lucide-react-native';
import CardGrid from './CardGrid';

/**
 * NOTE:
 * - Adjust the paths above to match your project structure.
 * - This example assumes `useSearchStore` provides:
 *    { searchKey, results, loading, runSearch }
 *   and `results` may contain `places` and `dishes` arrays or be a flat list
 *   — adapt the destructuring below if your API returns a different shape.
 */

export default function PopularsScreen() {
  const { popularPlaces, popularItems, isLoading, itemsSearchPerformed, placesSearchPerformed } = usePopularsStore();
  const { fetchPopularPlaces, fetchPopularItems, itemsLoading, placesLoading, error } = useHomeHook();

  const [tabIndex, setTabIndex] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [hasMorePlaces, setHasMorePlaces] = useState(true);
  const [page, setPage] = useState(1);

  // const { selectedCuisines, selectedDietary } = useFiltersStore();

  // runSearch will use the stores' searchKey and selected filters internally
  // Optionally re-run search when searchKey or filters change:
  useEffect(() => {
    // Do not auto-run on every mount if you don't want that — uncomment if desired
    if (!itemsSearchPerformed && !itemsLoading) {
      fetchPopularItems();
    }
    if (!placesSearchPerformed && !placesLoading) {
      fetchPopularPlaces();
    }
  }, []);

  // Normalize results shape to get two arrays
  // Adapt this to match your backend (this is defensive)
  const places = (popularPlaces.results ?? []) as Place[];
  const dishes = (popularItems?.results ?? []) as PlaceItem[];

  const renderPlace = ({ item: place }: { item: Place }) => (
    // <View style={styles.item}>
    //   <SmoothText style={styles.itemTitle}>{place.placeName}</SmoothText>
    //   {/* {place.subtitle ? <SmoothText style={styles.itemSubtitle}>{place.subtitle}</SmoothText> : null} */}
    // </View>
    <View style={styles.item}>
      <PopularPlaceCard place={place} />
    </View>
  );

  const renderDish = ({ item }: { item: PlaceItem }) => (
    <View style={styles.item}>
      {/* <SmoothText style={styles.itemTitle}>{item.name}</SmoothText> */}
      <PopularItemCard item={item} />
      {/* {item.restaurant ? <SmoothText style={styles.itemSubtitle}>{item.restaurant}</SmoothText> : null} */}
    </View>
  );

  const loadMorePlaces = () => {
    if (!isLoading && hasMorePlaces) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPopularPlaces(nextPage);
    }
  };

  const loadMoreDishes = () => {
    if (!isLoading && hasMoreItems) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPopularItems(nextPage);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: theme.spacing.sm, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      {/* Popular items */}
      <SmoothText style={{ fontSize: 18, fontWeight: '600', marginVertical: 10 }}>Popular items near you</SmoothText>

      {/* <View style={{ marginBottom: 20 }}>
        <View className="flex-row flex-wrap justify-between">
          {dishes.map((item) => (
            <View key={item._id} style={{ width: '49%', marginBottom: 12 }}>
              {renderDish({ item })}
            </View>
          ))}
        </View>

        {itemsLoading ? (
          <ActivityIndicator size="small" color={theme.colors.primaryDark} style={{ margin: 10 }} />
        ) : hasMoreItems ? (
          <TouchableOpacity onPress={loadMoreDishes} className="flex-row items-center my-1">
            <Text className="text-blue-500">Load more</Text>
            <ChevronDown className="text-blue-500 " />
          </TouchableOpacity>
        ) : (
          <SmoothText style={{ textAlign: 'center', margin: 10, color: '#666' }}>No more items</SmoothText>
        )}
      </View> */}

      <CardGrid dishes={dishes} itemsLoading={itemsLoading} hasMoreItems={hasMoreItems} loadMoreDishes={loadMoreDishes} renderDish={({ item }) => <PopularItemCard item={item} />} theme={theme} />

      {/* Popular places */}
      <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 10 }}>Popular places near you</Text>
      <CardGrid dishes={places} itemsLoading={placesLoading} hasMoreItems={hasMorePlaces} loadMoreDishes={loadMorePlaces} renderDish={({ item }) => <PopularPlaceCard place={item} />} theme={theme} />

      {/* <View style={{ marginBottom: 20 }}>
        <View className="flex-row flex-wrap justify-between">
          {places.map((place) => (
            <View key={place._id} style={{ width: '48%', marginBottom: 12 }}>
              {renderPlace({ item: place })}
            </View>
          ))}
        </View>

        {placesLoading ? (
          <ActivityIndicator size="small" color={theme.colors.primaryDark} style={{ margin: 10 }} />
        ) : hasMorePlaces ? (
          <TouchableOpacity onPress={loadMorePlaces} className="flex-row items-center my-1">
            <Text className="text-blue-500">Load more</Text>
            <ChevronDown className="text-blue-500" />
          </TouchableOpacity>
        ) : (
          <SmoothText style={{ textAlign: 'center', margin: 10, color: '#666' }}>No more items</SmoothText>
        )}
      </View> */}
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
