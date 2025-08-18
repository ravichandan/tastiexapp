// features/home/hooks/home.hook.ts
import { useCallback, useState } from 'react';
import { useFiltersStore } from '@/state/useFiltersStore';
import { usePopularsStore } from '@/state/usePopularsStore';
import { doGetPopularPlaces } from '@/services/placesApi';
import { doGetPopularItems } from '@/services/itemsApi';
import { setItem } from 'expo-secure-store';

export const useHomeHook = () => {
  const {
    setItemsSearchPerformed,
    setPlacesSearchPerformed,
    setPopularItems,
    setPopularPlaces,
    setLoading: setPopularLoading,
    setError: setPopularError,
  } = usePopularsStore();
  const { selectedCuisines, selectedDietary, location, radius } = useFiltersStore();
  const [itemsLoading, setItemsLoading] = useState(false); // Only load if not in store
  const [placesLoading, setPlacesLoading] = useState(false); // Only load if not in store
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches popular places and items based on current filter selections.
   * - Calls the popular places and items endpoints with selected cuisines, dietary options, location, and radius.
   * - Updates the populars store with the fetched results.
   * - Handles loading and error states for both places and items.
   *
   * @param
   */
  const fetchPopularPlaces: (pageNumber?: number) => Promise<void> = useCallback(async (pageNumber = 1) => {
    setPlacesLoading(true);
    setPlacesSearchPerformed(true);
    // Read the latest selected filters (guaranteed up-to-date)
    const filters = {
      cuisines: selectedCuisines,
      dietary: selectedDietary,
      location,
      distance: radius,
      pageNum: pageNumber,
      pageSize: 12,
    };
    try {
      // call popular-places endpoint
      const { data } = await doGetPopularPlaces(filters);
      // save it into popular store
      setPopularPlaces({ pageNumber: data.page, pageSize: data.pageSize, results: data.places, total: data.size });
      setPlacesLoading(false);

    } catch (err: any) {
      console.error('Search failed', err);
      setError(err.message + '. ' + JSON.stringify(err.error) || 'Search failed');
      setPopularError(err.message + '. ' + JSON.stringify(err.error) || 'Search failed');
    } finally {
      
      // setPopularLoading(false);
    }
  }, [
    selectedCuisines,
    selectedDietary,
    location,
    radius,
    setPopularPlaces,
    doGetPopularPlaces,
    setPlacesLoading,
    setError,
  ]);

  /**
   * Fetches popular places and items based on current filter selections.
   * - Calls the popular places and items endpoints with selected cuisines, dietary options, location, and radius.
   * - Updates the populars store with the fetched results.
   * - Handles loading and error states for both places and items.
   *
   * @param
   */
  const fetchPopularItems: (pageNumber?: number) => Promise<void> = useCallback(async (pageNumber = 1) => {
    // setPopularLoading(true);
    setItemsLoading(true);
    setItemsSearchPerformed(false);
    // setPlacesLoading(true);

    // Read the latest selected filters (guaranteed up-to-date)
    const filters = {
      cuisines: selectedCuisines,
      dietary: selectedDietary,
      location,
      distance: radius,
      pageNum: pageNumber,
      pageSize: 12,
    };
    try {
      // // call popular-places endpoint
      // const { data } = await doGetPopularPlaces(filters);
      // // save it into popular store
      // setPopularPlaces({ pageNumber: data.page, pageSize: data.pageSize, results: data.places, total: data.size });
      // setPlacesLoading(false);

      // call popular-items endpoint
      const { data: items } = await doGetPopularItems(filters);
      // save it into popular store
      setPopularItems({ pageNumber: items.page, pageSize: items.pageSize, results: items.items, total: items.size });
      setItemsLoading(false);
    } catch (err: any) {
      console.error('Search failed', err);
      setError(err.message + '. ' + JSON.stringify(err.error) || 'Search failed');
      setPopularError(err.message + '. ' + JSON.stringify(err.error) || 'Search failed');
    } finally {
      
      // setPopularLoading(false);
    }
  }, [
    selectedCuisines,
    selectedDietary,
    location,
    radius,
    // setPopularPlaces,
    setPopularItems,
    doGetPopularItems,
    setItemsLoading,
    // setPlacesLoading,
    setError,
  ]);

  return {
    fetchPopularItems,
    fetchPopularPlaces,
    itemsLoading,
    placesLoading,
    error,
  };
};
