// features/home/hooks/home.hook.ts
import { useCallback, useState } from 'react';
import { useFiltersStore } from '@/state/useFiltersStore';
import { usePopularsStore } from '@/state/usePopularsStore';
import { doGetPopularPlaces } from '@/services/placesApi';
import { doGetPopularItems } from '@/services/itemsApi';

export const useHomeHook = () => {
  const {
    setSearchPerformed,
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
  const fetchPopulars: () => Promise<void> = useCallback(async () => {
    setPopularLoading(true);
    setItemsLoading(true);
    setPlacesLoading(true);

    // Read the latest selected filters (guaranteed up-to-date)
    const filters = {
      cuisines: selectedCuisines,
      dietary: selectedDietary,
      location,
      distance: radius,
    };
    try {
      // call popular-places endpoint
      const { data } = await doGetPopularPlaces(filters);
      // save it into popular store
      setPopularPlaces({ pageNumber: data.page, pageSize: data.pageSize, results: data.places, total: data.size });
      setPlacesLoading(false);

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
      setSearchPerformed(false);
      setPopularLoading(false);
    }
  }, [
    selectedCuisines,
    selectedDietary,
    location,
    radius,
    setPopularPlaces,
    setPopularItems,
    doGetPopularPlaces,
    setItemsLoading,
    setPlacesLoading,
    setError,
  ]);

  return {
    fetchPopulars,
    itemsLoading,
    placesLoading,
    error,
  };
};
