// src/features/search/screens/SearchResultsScreen.tsx
import { useEffect } from 'react';
import * as React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, ListRenderItem } from 'react-native';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import { useSearchStore } from '@/state/useSearchStore';
import { useFiltersStore } from '@/state/useFiltersStore';
import { FlashList } from '@shopify/flash-list';
import { Place, PlaceItem } from '@/types/Types';
import SearchPlaceCard from './SearchPlaceCard';
import SmoothText from '@/shared/components/SmoothText';

/**
 * NOTE:
 * - Adjust the paths above to match your project structure.
 * - This example assumes `useSearchStore` provides:
 *    { searchKey, results, loading, runSearch }
 *   and `results` may contain `places` and `dishes` arrays or be a flat list
 *   — adapt the destructuring below if your API returns a different shape.
 */

export default function SearchResultsScreen() {
  const { placesResponse, itemsResponse: items, searchKey, isLoading } = useSearchStore();
  // const { selectedCuisines, selectedDietary } = useFiltersStore();

  // runSearch will use the stores' searchKey and selected filters internally
  // Optionally re-run search when searchKey or filters change:
  useEffect(() => {
    // Do not auto-run on every mount if you don't want that — uncomment if desired
    // if (searchKey) runSearch();
  }, []);

  // Normalize results shape to get two arrays
  // Adapt this to match your backend (this is defensive)
  const places = (placesResponse.results ?? []) as Place[];
  const dishes = (items?.results ?? []) as PlaceItem[];

  const renderPlace = ({ item: place }: { item: Place }) => (
    // <View style={styles.item}>
    //   <SmoothText style={styles.itemTitle}>{place.placeName}</SmoothText>
    //   {/* {place.subtitle ? <SmoothText style={styles.itemSubtitle}>{place.subtitle}</SmoothText> : null} */}
    // </View>
    <SearchPlaceCard place={place} />
  );

  const renderDish = ({ item }: { item: PlaceItem }) => (
    <View style={styles.item}>
      <SmoothText style={styles.itemTitle}>{item.name}</SmoothText>
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
              {/* <SmoothText style={styles.itemTitle}>hello places</SmoothText> */}
              {isLoading ? (
                <ActivityIndicator style={{ marginTop: 24 }} />
              ) : places && places.length > 0 ? (
                <FlashList
                  data={places.slice(1, 2)} // Limit to first 10 for performance
                  keyExtractor={(item) => item.id}
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
          </TabScreen>

          <TabScreen label="Dishes">
            <View style={styles.tabContent}>
              {/* <SmoothText style={styles.itemTitle}>hello dishes</SmoothText> */}
              {isLoading ? (
                <ActivityIndicator style={{ marginTop: 24 }} />
              ) : dishes && dishes.length > 0 ? (
                <FlashList
                  data={dishes}
                  keyExtractor={(item) => item.id}
                  renderItem={renderDish}
                  contentContainerStyle={{ paddingBottom: 24 }}
                  
                  
                />
              ) : (
                <SmoothText style={styles.emptyText}>No dishes found</SmoothText>
              )}
            </View>
          </TabScreen>
        </Tabs>
      </TabsProvider>
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
    paddingVertical: 12,
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
