// features/home/hooks/useSearch.ts
import { useCallback, useState } from 'react';
import { axiosInstance } from '@/services/axiosInstance';
import { LocationData, useFiltersStore } from '@/state/useFiltersStore';
import { useSearchStore } from '@/state/useSearchStore';
import { Place, Item } from '@/types/Types';
import { CUISINES, DIETARIES } from '@/shared/config/menuConfig';
import { API_ENDPOINTS } from '@/shared/constants/constants';
import { SuburbType } from '@/types/Types';
import { doGetItems, doGetPlaces } from '@/services/searchApi';
import { logger } from '@/shared/utils/logger';

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
    setItems,
    setPlaces,
    placesResponse,
    setLoading: setSearchLoading,
    setError: setSearchError,
    // setSearchPerformed,
  } = useSearchStore();

  // UI state for loading options
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  const fetchFilterOptions = useCallback(async () => {
    logger.debug('In useSearch.ts, Fetching filter options...');
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
  // const hasSearchResults = useSearchStore((state) => state.searchPerformed);

  /**
   * performSearch:
   * - reads current selected filters from useFiltersStore (latest values)
   * - reads searchKey either from passed argument or from useSearchStore's current state
   * - calls search API, and writes a snapshot (searchKey + filters + results) into useSearchStore
   */
  const performSearch = useCallback(
    async (maybeQuery?: string, pageNum: number = 1, pageSize: number = 10) => {
      logger.debug('In useSearch.ts, performSearch (REAL API) called with:', { maybeQuery, pageNum, pageSize });
      const currentSearchKey = typeof maybeQuery === 'string' ? maybeQuery : useSearchStore.getState().searchKey;

      if (!currentSearchKey || !currentSearchKey.trim()) {
        useSearchStore.getState().clear();
        return;
      }

      const filters = {
        cuisines: useFiltersStore.getState().selectedCuisines,
        dietary: useFiltersStore.getState().selectedDietary,
        location: useFiltersStore.getState().location,
        distance: useFiltersStore.getState().radius,
        pageNum,
        pageSize,
      };

      // Only reset results and store filters/searchKey on new search
      if (pageNum === 1) {
        setSearchData({
          searchKey: currentSearchKey,
          filters
        });
      }

      setSearchError(null);
      setSearchLoading(true);
      try {
        // Call real API for places and items
        const [placesRes, itemsRes] = await Promise.all([
          doGetPlaces(currentSearchKey, filters),
          doGetItems(currentSearchKey, filters)
        ]);

        // Extract data from Axios responses
        const placesData = placesRes.data;
        const itemsData = itemsRes.data;
        logger.debug('Search results:', {
          placesData
          // items: itemsData?.results?.length,
        });
        // Handle places pagination
        const pagePlaces = (placesData?.places ?? []) as Place[];
        const prevPlaces = (placesResponse?.results ?? []) as Place[];
        const newPlaces = (pageNum > 1 ? [...prevPlaces, ...pagePlaces] : pagePlaces) as Place[];
        setPlaces({
          pageNum,
          pageSize,
          results: newPlaces,
          total: placesData?.total ?? newPlaces.length,
          hasMore: placesData?.hasMore ?? (pagePlaces.length === pageSize),
        });

        // Handle items pagination
        const pageItems = (itemsData?.items ?? []) as Item[];
        const prevItems = (useSearchStore.getState().itemsResponse?.results ?? []) as Item[];
        const newItems = (pageNum > 1 ? [...prevItems, ...pageItems] : pageItems) as Item[];
        setItems({
          pageNum,
          pageSize,
          results: newItems,
          total: itemsData?.total ?? newItems.length,
          hasMore: itemsData?.hasMore ?? (pageItems.length === pageSize),
        });

        return { places: pagePlaces, items: pageItems };
      } catch (err: any) {
        logger.error('performSearch API error', err);
        setSearchError(err?.message || 'Search failed');
      } finally {
        setSearchLoading(false);
      }
    },
    [placesResponse, setSearchData, setSearchLoading, setSearchError],
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
        logger.debug('Suburb name:', data);
        if (data?.name) {
          setLocationName(data.name);
        }
        // const results = data?.places ?? data; // adapt to your API
        // logger.debug('Search results:', JSON.stringify(data.places?.length));
        // logger.debug('Search results:', Object.keys(data));
        // Save snapshot to search store (so results + filters + key persist)
        // setSearchData({
        //   searchKey: currentSearchKey,
        //   filters,
        //   placesResponse: { pageNum: data.page, pageSize: data.pageSize, results: data.places, total: data.size  },
        //   itemsResponse: { pageNum: data.page, pageSize: data.pageSize, results: data.places, total: data.size  },
        // });
      } catch (err: any) {
        console.error('Search failed', err);
        setSearchError(err.message+'. '+ JSON.stringify(err.error) || 'Search failed');
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

  /**
   * performSearch:
   * - reads current selected filters from useFiltersStore (latest values)
   * - reads searchKey either from passed argument or from useSearchStore's current state
   * - calls search API, and writes a snapshot (searchKey + filters + results) into useSearchStore
   */
  const mockPerformSearch = useCallback(
    async (maybeQuery?: string, pageNum: number = 1, pageSize: number = 10) => {
      logger.debug('In useSearch.ts, performSearch (MOCK) called with:', { maybeQuery, pageNum, pageSize });
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
        location: useFiltersStore.getState().location,
        distance: useFiltersStore.getState().radius,
        pageNum,
        pageSize,
      };
      setSearchData({
        searchKey: currentSearchKey,
        filters
      });

      setSearchError(null);

      // --- MOCK DATA GENERATION ---
      // Simulate a paginated API
      const totalPlaces = 23;
      const totalItems = 17;
      const allPlaces = Array.from({ length: totalPlaces }, (_, i) => ({
        _id: `place_${i+1}`,
        name: `Mock Place ${i+1}`,
        address: { city: 'Sydney' },
        createdAt: new Date().toISOString(),
        items: [],
        medias: [],
        modifiedAt: new Date().toISOString(),
        openingTimes: [],
        placeName: `Mock Place ${i+1}`,
        ratingInfo: {},
        tags: [],
      }));
      const allItems = Array.from({ length: totalItems }, (_, i) => ({
        _id: `item_${i+1}`,
        name: `Mock Dish ${i+1}`,
        price: 10 + i,
        restaurant: `Mock Place ${((i % totalPlaces) + 1)}`,
      }));

      // Paginate
      const startPlace = (pageNum - 1) * pageSize;
      const endPlace = startPlace + pageSize;
      const pagePlaces = allPlaces.slice(startPlace, endPlace);

      const prevPlaces = (placesResponse?.results ?? []) as Place[];
      const newPlaces = (pageNum > 1 ? [...prevPlaces, ...pagePlaces] : pagePlaces) as Place[];

      setPlaces({
        pageNum,
        pageSize,
        results: newPlaces,
        total: totalPlaces,
        hasMore: endPlace < totalPlaces,
      });

      // Items pagination
      const startItem = (pageNum - 1) * pageSize;
      const endItem = startItem + pageSize;
      const pageItems = allItems.slice(startItem, endItem);
      const prevItems = (useSearchStore.getState().itemsResponse?.results ?? []) as Item[];
      const newItems = (pageNum > 1 ? [...prevItems, ...pageItems] : pageItems) as Item[];

      setItems({
        pageNum,
        pageSize,
        results: newItems,
        total: totalItems,
        hasMore: endItem < totalItems,
      });

      // Simulate async
      return new Promise((resolve) => setTimeout(() => resolve({ places: pagePlaces, items: pageItems }), 300));
    },
    [placesResponse, setSearchData, setSearchLoading, setSearchError],
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
