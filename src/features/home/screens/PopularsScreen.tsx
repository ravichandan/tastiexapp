// src/features/home/screens/PopularPlacesScreen.tsx
import { useEffect } from 'react';
import * as React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, ListRenderItem } from 'react-native';
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

/**
 * NOTE:
 * - Adjust the paths above to match your project structure.
 * - This example assumes `useSearchStore` provides:
 *    { searchKey, results, loading, runSearch }
 *   and `results` may contain `places` and `dishes` arrays or be a flat list
 *   — adapt the destructuring below if your API returns a different shape.
 */

export default function PopularsScreen() {
  const { popularPlaces, popularItems, isLoading,searchPerformed } = usePopularsStore();
  const { fetchPopulars, itemsLoading, placesLoading,  error } = useHomeHook();
  // const { selectedCuisines, selectedDietary } = useFiltersStore();

  // runSearch will use the stores' searchKey and selected filters internally
  // Optionally re-run search when searchKey or filters change:
  useEffect(() => {
    // Do not auto-run on every mount if you don't want that — uncomment if desired
    if (!searchPerformed && !isLoading) fetchPopulars();
  }, []);

  // Normalize results shape to get two arrays
  // Adapt this to match your backend (this is defensive)
  const places = (popularPlaces.results ?? []) as Place[];
  const dishes = (popularItems?.results ?? []) as Item[];

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

  // const renderDish: ListRenderItem<any> = ({ item }) => (
  //   <View style={styles.item}>
  //     <SmoothText style={styles.itemTitle}>{item.name}</SmoothText>
  //     {item.restaurant ? <SmoothText style={styles.itemSubtitle}>{item.restaurant}</SmoothText> : null}
  //   </View>
  // );

  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <View style={styles.container}>
      {/* popular items */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginVertical: 10 }}>
        Popular items near you
      </Text>
            <View style={styles.tabContent}>
              {/* <SmoothText style={styles.itemTitle}>hello places</SmoothText> */}
              {isLoading ? (
                <ActivityIndicator style={{ marginTop: 24 }} />
              ) : places && places.length > 0 ? (
                <FlashList
                  data={places} 
                  keyExtractor={(item) => item._id}
                  renderItem={renderPlace}
                />

                // <FlatList
                //   data={places.slice(1, 2)} // Limit to first 10 for performance
                //   keyExtractor={(item, idx) => (item.id ?? idx).toString()}
                //   renderItem={renderPlace}
                //   contentContainerStyle={{ paddingBottom: 24 }}
                // />
              ) : (
                <SmoothText style={styles.emptyText}>No places found</SmoothText>
              )}
            </View>


            <View style={styles.tabContent}>
              {/* <SmoothText style={styles.itemTitle}>hello dishes</SmoothText> */}
              {isLoading ? (
                <ActivityIndicator style={{ marginTop: 24 }} />
              ) : dishes && dishes.length > 0 ? (
                <FlashList
                  data={dishes}
                  keyExtractor={(item) => item._id}
                  renderItem={renderDish}
                  contentContainerStyle={{ paddingBottom: 24 }}
                  
                  
                />
              ) : (
                <SmoothText style={styles.emptyText}>No dishes found</SmoothText>
              )}
            </View>



    </View>
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
