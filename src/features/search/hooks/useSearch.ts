// features/home/hooks/useSearch.ts
import { useCallback, useState } from 'react';
import { axiosInstance } from '@/services/axiosInstance';
import { LocationData, useFiltersStore } from '@/state/useFiltersStore';
import { useSearchStore } from '@/state/useSearchStore';
import { CUISINES, DIETARIES } from '@/shared/config/menuConfig';
import { API_ENDPOINTS } from '@/shared/constants/constants';
import { SuburbType } from '@/types/Types';

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
    suburbsOptions,
    selectedCuisines,
    selectedDietary,
    setCuisinesOptions,
    setDietaryOptions,
    setSuburbsOptions,
    setSelectedCuisines,
    setSelectedDietary,
    setLocationName,
    
  } = useFiltersStore();

  // search store methods
  const {
    setSearchData, // convenience method to write snapshot
    setLoading: setSearchLoading,
    setError: setSearchError,
    setSearchPerformed,
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

  /** returns true if there are search results */
  const hasSearchResults = useSearchStore((state) => state.searchPerformed);

  /**
   * performSearch:
   * - reads current selected filters from useFiltersStore (latest values)
   * - reads searchKey either from passed argument or from useSearchStore's current state
   * - calls search API, and writes a snapshot (searchKey + filters + results) into useSearchStore
   */
  const performSearch = useCallback(
    async (maybeQuery?: string) => {
      // Use latest searchKey from store if not provided
      const currentSearchKey = typeof maybeQuery === 'string' ? maybeQuery : useSearchStore.getState().searchKey;

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
        setSearchPerformed(true);
        setSearchError(null);
        // places/?placeName=biryani&itemName=biryani&distance=50&city=sydney
        // /items/?itemName=biryani&distance=50&city=Sydney
        const placesEndpoint = API_ENDPOINTS.PLACES;
        // call search endpoint — adapt the params shape to your backend
        console.log('Performing search with params:', {
          placeName: currentSearchKey,
          itemName: currentSearchKey,
          distance: 50,
          city: 'sydney',
          cuisines: filters.cuisines.join(',') || undefined,
          dietary: filters.dietary.join(',') || undefined,
        });
        const { data } = await axiosInstance.get(placesEndpoint, {
          params: {
            placeName: currentSearchKey,
            itemName: currentSearchKey,
            distance: 50,
            city: 'sydney',
            cuisines: filters.cuisines.join(',') || undefined,
            dietary: filters.dietary.join(',') || undefined,
          },
        });

        const results = data?.places ?? data; // adapt to your API
        console.log('Search results:', JSON.stringify(data.places?.length));
        console.log('Search results:', Object.keys(data));
        // Save snapshot to search store (so results + filters + key persist)
        setSearchData({
          searchKey: currentSearchKey,
          filters,
          placesResponse: { pageNumber: data.page, pageSize: data.pageSize, results: data.places, total: data.size },
          itemsResponse: { pageNumber: data.page, pageSize: data.pageSize, results: data.places, total: data.size },
        });
      } catch (err: any) {
        console.error('Search failed', err);
        setSearchError(err?.message || 'Search failed');
      } finally {
        setSearchLoading(false);
      }
    },
    [setSearchData, setSearchLoading, setSearchError],
  );

  /**
   * getSuburbName:
   * - reads latitude and longitude from useFiltersStore
   * - calls suburb name API, and writes a snapshot (searchKey + filters + results) into useSearchStore
   */
  const getSuburbName = useCallback(
    async (location?: LocationData) => {
      // Use latest searchKey from store if not provided
      const currentLocation = location ?? useFiltersStore.getState().location;

      // Trim and bail if empty (also clear stored results)
      if (!currentLocation || !currentLocation.lat || !currentLocation.lng) {
        useFiltersStore.getState().clearLocation();
        return;
      }

      try {
        // setSearchLoading(true);
        // setSearchPerformed(true);
        // setSearchError(null);
        // places/?placeName=biryani&itemName=biryani&distance=50&city=sydney
        // /items/?itemName=biryani&distance=50&city=Sydney
        const suburbNameEndpoint = API_ENDPOINTS.SUBURB_NAME;
        // call search endpoint — adapt the params shape to your backend
        const { data } = await axiosInstance.get(suburbNameEndpoint, {
          params: {
            latitude: currentLocation.lat,
            longitude: currentLocation.lng,
          },
        });
        console.log('Suburb name:', data);
        if (data?.name) {
          setLocationName(data.name);
        }
        // const results = data?.places ?? data; // adapt to your API
        // console.log('Search results:', JSON.stringify(data.places?.length));
        // console.log('Search results:', Object.keys(data));
        // Save snapshot to search store (so results + filters + key persist)
        // setSearchData({
        //   searchKey: currentSearchKey,
        //   filters,
        //   placesResponse: { pageNumber: data.page, pageSize: data.pageSize, results: data.places, total: data.size  },
        //   itemsResponse: { pageNumber: data.page, pageSize: data.pageSize, results: data.places, total: data.size  },
        // });
      } catch (err: any) {
        console.error('Search failed', err);
        setSearchError(err?.message || 'Search failed');
      } finally {
        setSearchLoading(false);
      }
    },
    [setSearchData, setSearchLoading, setSearchError],
  );
 
  const fetchAutocomplete = useCallback(
    async (
      input: string, { radiusMeters }: { radiusMeters?: number } = {},
    ) => {
      const suburbsOptions = useFiltersStore.getState().suburbsOptions;
      return Promise.resolve(
        suburbsOptions.filter((suburb: SuburbType) => suburb.name.toLowerCase().includes(input.toLowerCase())),
      );
    }, [suburbsOptions],
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

    // suburbs related
    getSuburbName,
    fetchAutocomplete,
  };
};
