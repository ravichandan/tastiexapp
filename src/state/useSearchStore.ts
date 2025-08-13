import { create } from 'zustand';
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
  pageNumber: number;
  total: number;
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

export const useSearchStore = create<SearchState>((set) => ({
  searchKey: '',
  filters: {},
  placesResponse: { pageNumber: 0, pageSize: 10, results: [], total: 0 },
  itemsResponse: { pageNumber: 0, pageSize: 10, results: [], total: 0 },
  isLoading: false,
  searchPerformed: false,
  error: null,
  setSearchKey: (key) => set({ searchKey: key }),
  setFilters: (filters) => set({ filters }),
  setPlaces: (data) => set({ placesResponse: data }),
  setItems: (data) => set({ itemsResponse: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setSearchPerformed: (searchPerformed) => set({ searchPerformed }),
  setError: (error) => set({ error }),
  clear: () =>
    set({
      searchKey: '',
      placesResponse: { pageNumber: 0, pageSize: 10, results: [], total: 0 },
      itemsResponse: { pageNumber: 0, pageSize: 10, results: [], total: 0 },
      filters: {},
      error: undefined,
    }),
  setSearchData: ({ searchKey, filters, placesResponse, itemsResponse }) =>
    set({
      searchKey,
      filters,
      placesResponse: placesResponse || { pageNumber: 0, pageSize: 10, results: [], total: 0 },
      itemsResponse: itemsResponse || { pageNumber: 0, pageSize: 10, results: [], total: 0 },
      isLoading: false,
      error: undefined,
    }),
}));
