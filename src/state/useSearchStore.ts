import { create } from 'zustand';
import { logger } from '@/shared/utils/logger';
import { CuisineType, DietaryType, Item, Place, PlaceItem } from '@/types/Types';

interface FiltersSnapshot {
  cuisines?: CuisineType[];
  dietaryOptions?: DietaryType[];
}

interface SearchResult {
  // id: string;
  // name: string;
  // image?: string;
  // [key: string]: any;
  pageSize: number;
  results: Place[] | PlaceItem[] | Item[];
  pageNum: number;
  total: number;
  hasMore?: boolean;
}

interface SearchState {
  searchKey: string;
  filters: FiltersSnapshot;
  placesResponse: SearchResult;
  itemsResponse: SearchResult;
  searchPerformed: boolean;
  isLoading: boolean;
  error: string | null;
  setFilters: (filters: FiltersSnapshot) => void;
  setSearchKey: (key: string) => void;
  setPlaces: (data: SearchResult) => void;
  setItems: (data: SearchResult) => void;
  setLoading: (loading: boolean) => void;
  setSearchPerformed: (searchPerformed: boolean) => void;
  setError: (error: string | null) => void;
  // convenience method to set all at once
  setSearchData: (payload: {
    searchKey: string;
    filters: FiltersSnapshot;
    placesResponse?: SearchResult;
    itemsResponse?: SearchResult;
  }) => void;
  clear: () => void;
}


// shallow array equality
function shallowArrayEqual(a: any[], b: any[]) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchKey: '',
  filters: {},
  placesResponse: { pageNum: 0, pageSize: 10, results: [], total: 0, hasMore: true },
  itemsResponse: { pageNum: 0, pageSize: 10, results: [], total: 0, hasMore: true },
  isLoading: false,
  searchPerformed: false,
  error: null,
  setSearchKey: (key) => {
    logger.debug('[useSearchStore] setSearchKey', { key });
    set({ searchKey: key });
  },
  setFilters: (filters) => {
    logger.debug('[useSearchStore] setFilters', { filters });
    set({ filters });
  },
  setPlaces: (data) => {
    const prev = get().placesResponse;
    if (
      prev.pageNum === data.pageNum &&
      prev.pageSize === data.pageSize &&
      prev.total === data.total &&
      prev.hasMore === data.hasMore &&
      shallowArrayEqual(prev.results, data.results)
    ) {
      // No change, skip update
      return;
    }
    logger.debug('[useSearchStore] setPlaces', { data });
    set({ placesResponse: data });
  },
  setSearchPerformed: (searchPerformed) => {
    logger.debug('[useSearchStore] setSearchPerformed', { searchPerformed });
    set({ searchPerformed });
  },
  setItems: (data) => {
    const prev = get().itemsResponse;
    if (
      prev.pageNum === data.pageNum &&
      prev.pageSize === data.pageSize &&
      prev.total === data.total &&
      prev.hasMore === data.hasMore &&
      shallowArrayEqual(prev.results, data.results)
    ) {
      // No change, skip update
      return;
    }
    logger.debug('[useSearchStore] setItems', { data });
    set({ itemsResponse: data });
  },
  setLoading: (loading) => {
    logger.debug('[useSearchStore] setLoading', { loading });
    set({ isLoading: loading });
  },
  // setSearchPerformed: (searchPerformed) => {
  //   logger.debug('[useSearchStore] setSearchPerformed', { searchPerformed });
  //   set({ searchPerformed });
  // },
  setError: (error) => {
    logger.debug('[useSearchStore] setError', { error });
    set({ error });
  },
  clear: () => {
    logger.debug('[useSearchStore] clear');
    set({
      searchKey: '',
      placesResponse: { pageNum: 0, pageSize: 10, results: [], total: 0, hasMore: true },
      itemsResponse: { pageNum: 0, pageSize: 10, results: [], total: 0, hasMore: true },
      filters: {},
      error: undefined,
    });
  },
  setSearchData: ({ searchKey: newSearchKey, filters, placesResponse, itemsResponse }) => {
    const prev = get();
    let updates: Partial<SearchState> = { filters, isLoading: false, error: undefined };
    // Only update searchKey if changed
    if (prev.searchKey !== newSearchKey) {
      updates.searchKey = newSearchKey;
    }
    // Only update placesResponse if results changed (shallow)
    const newPlaces = placesResponse || { pageNum: 0, pageSize: 10, results: [], total: 0, hasMore: true };
    const prevPlaces = prev.placesResponse;
    if (
      prevPlaces.pageNum !== newPlaces.pageNum ||
      prevPlaces.pageSize !== newPlaces.pageSize ||
      prevPlaces.total !== newPlaces.total ||
      prevPlaces.hasMore !== newPlaces.hasMore ||
      !shallowArrayEqual(prevPlaces.results, newPlaces.results)
    ) {
      updates.placesResponse = newPlaces;
    }
    // Only update itemsResponse if results changed (shallow)
    const newItems = itemsResponse || { pageNum: 0, pageSize: 10, results: [], total: 0, hasMore: true };
    const prevItems = prev.itemsResponse;
    if (
      prevItems.pageNum !== newItems.pageNum ||
      prevItems.pageSize !== newItems.pageSize ||
      prevItems.total !== newItems.total ||
      prevItems.hasMore !== newItems.hasMore ||
      !shallowArrayEqual(prevItems.results, newItems.results)
    ) {
      updates.itemsResponse = newItems;
    }
    logger.debug('[useSearchStore] setSearchData', updates);
    set(updates);
  },
}));
