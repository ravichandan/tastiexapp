// features/home/hooks/useSearch.ts
import { useCallback, useState } from 'react';
import { axiosInstance } from '@/services/axiosInstance';
import { useFiltersStore } from '@/state/useFiltersStore';
import { useSearchStore } from '@/state/useSearchStore';
import { CUISINES, DIETARIES } from '@/shared/config/menuConfig';
import { API_ENDPOINTS } from '@/shared/constants/constants';

/**
 * Hook responsibilities:
 * - fetch available options (cuisines/dietary) and set them into useFiltersStore
 * - performSearch: read current selected filters from useFiltersStore and searchKey from useSearchStore (or accept query param),
 *   call search API and then snapshot results + filters into useSearchStore
 */

export const useSearch = () => {
  // filter options & selected filters
  const {
    cuisinesOptions,
    dietaryOptions,
    selectedCuisines,
    selectedDietary,
    setCuisinesOptions,
    setDietaryOptions,
    setSelectedCuisines,
    setSelectedDietary,
  } = useFiltersStore();

  // search store methods
  const {
    setSearchData, // convenience method to write snapshot
    setLoading: setSearchLoading,
    setError: setSearchError,
  } = useSearchStore();

  // UI state for loading options
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  const fetchFilterOptions = useCallback(async () => {
    console.log('In useSearch.ts, Fetching filter options...');
    setOptionsLoading(true);
    setOptionsError(null);
    try {
      // adapt endpoints to your backend
      const [cuisRes, dietRes] = await Promise.all([
        // axiosInstance.get('/filters/cuisines'),
        // axiosInstance.get('/filters/dietary'),
        
        // Mocking API calls for now
        Promise.resolve(CUISINES),
        Promise.resolve(DIETARIES),
      ]);
      
      // expecting arrays like ['Indian', 'Mexican', ...]
      setCuisinesOptions(cuisRes || []);
      setDietaryOptions(dietRes || []);
    } catch (err: any) {
      console.error('Failed to load filter options', err);
      setOptionsError(err?.message || 'Failed to load filter options');
    } finally {
      setOptionsLoading(false);
    }
  }, [setCuisinesOptions, setDietaryOptions]);

  /**
   * performSearch:
   * - reads current selected filters from useFiltersStore (latest values)
   * - reads searchKey either from passed argument or from useSearchStore's current state
   * - calls search API, and writes a snapshot (searchKey + filters + results) into useSearchStore
   */
  const performSearch = useCallback(
    async (maybeQuery?: string) => {
      // Use latest searchKey from store if not provided
      const currentSearchKey =
        typeof maybeQuery === 'string'
          ? maybeQuery
          : useSearchStore.getState().searchKey;

      // Trim and bail if empty (also clear stored results)
      if (!currentSearchKey || !currentSearchKey.trim()) {
        useSearchStore.getState().clear();
        return;
      }

      // Read the latest selected filters (guaranteed up-to-date)
      const filters = {
        cuisines: useFiltersStore.getState().selectedCuisines,
        dietary: useFiltersStore.getState().selectedDietary,
      };

      try {
        setSearchLoading(true);
        setSearchError(null);
        // places/?placeName=biryani&itemName=biryani&distance=50&city=sydney
        // /items/?itemName=biryani&distance=50&city=Sydney
        const placesEndpoint = API_ENDPOINTS.PLACES;
        // call search endpoint — adapt the params shape to your backend
        const { data } = await axiosInstance.get(placesEndpoint, {
          params: {
            placeName: currentSearchKey,
            itemName: currentSearchKey,
            cuisines: filters.cuisines.join(',') || undefined,
            dietary: filters.dietary.join(',') || undefined,
          },
        });

        const results = data?.places ?? data; // adapt to your API
        console.log('Search results:', data.size);
        // Save snapshot to search store (so results + filters + key persist)
        setSearchData({
          searchKey: currentSearchKey,
          filters,
          results,
        });
      } catch (err: any) {
        console.error('Search failed', err);
        setSearchError(err?.message || 'Search failed');
      } finally {
        setSearchLoading(false);
      }
    },
    [setSearchData, setSearchLoading, setSearchError]
  );

  return {
    // available options
    cuisinesOptions,
    dietaryOptions,
    optionsLoading,
    optionsError,
    fetchFilterOptions,

    // selected filters and setters (editing the current filters)
    selectedCuisines,
    selectedDietary,
    setSelectedCuisines,
    setSelectedDietary,

    // perform the search (writes snapshot into useSearchStore)
    performSearch,
  };
};
