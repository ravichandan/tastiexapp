// src/state/usePopularsStore.ts
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

interface PopularsState {
  filters: FiltersSnapshot;
  popularPlaces: SearchResult;
  popularItems: SearchResult;
  placesSearchPerformed: boolean;
  itemsSearchPerformed: boolean;
  isLoading: boolean;
  error: string | null;
  setFilters: (filters: FiltersSnapshot) => void;
  setPopularPlaces: (data: SearchResult) => void;
  setPopularItems: (data: SearchResult) => void;
  setLoading: (loading: boolean) => void;
  setPlacesSearchPerformed: (searchPerformed: boolean) => void;
  setItemsSearchPerformed: (searchPerformed: boolean) => void;
  setError: (error: string | null) => void;
  // convenience method to set all at once
  setPopularsData: (payload: {
    isLoading: boolean;
    filters: FiltersSnapshot;
    popularPlaces?: SearchResult;
    popularItems?: SearchResult;
  }) => void;
  clear: () => void;
}

export const usePopularsStore = create<PopularsState>((set) => ({
  filters: {},
  popularPlaces: { pageNumber: 0, pageSize: 10, results: [], total: 0 },
  popularItems: { pageNumber: 0, pageSize: 10, results: [], total: 0 },
  isLoading: false,
  placesSearchPerformed: false,
  itemsSearchPerformed: false,
  error: null,
  setFilters: (filters) => set({ filters }),
  setPopularPlaces: (data) =>
    set((state) => ({
      popularPlaces: {
        ...data,
        results: [
          ...state.popularPlaces?.results,
          ...data.results.filter((item) => !state.popularPlaces?.results.some((existing) => existing._id === item._id)),
        ] as Place[],
      },
    })),
  setPopularItems: (data) =>
    set((state) => ({
      popularItems: {
        ...data,
        results: [
          ...state.popularItems?.results,
          ...data.results.filter((item) => !state.popularItems?.results.some((existing) => existing._id === item._id)),
        ] as PlaceItem[],
      },
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setPlacesSearchPerformed: (searchPerformed) => set({ placesSearchPerformed: searchPerformed }),
  setItemsSearchPerformed: (searchPerformed) => set({ itemsSearchPerformed: searchPerformed }),
  setError: (error) => set({ error }),
  clear: () =>
    set({
      isLoading: false,
      popularPlaces: { pageNumber: 0, pageSize: 10, results: [], total: 0 },
      popularItems: { pageNumber: 0, pageSize: 10, results: [], total: 0 },
      filters: {},
      error: undefined,
    }),
  setPopularsData: ({ filters, popularPlaces, popularItems }) =>
    set((state) => ({
      filters,
      popularPlaces: {
        pageSize: popularPlaces?.pageSize || 0,
        results: [
          ...state.popularPlaces?.results,
          ...(popularPlaces?.results || []).filter((item) => !state.popularPlaces?.results.some((existing) => existing._id === item._id)),
        ] as Place[],
        pageNumber: popularPlaces?.pageNumber || 0,
        total: popularPlaces?.total || 0,
      },
      popularItems: {
        pageSize: popularItems?.pageSize || 0,
        results: [
          ...state.popularItems?.results,
          ...(popularItems?.results || []).filter((item) => !state.popularItems?.results.some((existing) => existing._id === item._id)),
        ] as PlaceItem[],
        pageNumber: popularItems?.pageNumber || 0,
        total: popularItems?.total || 0,
      },
      isLoading: false,
      error: undefined,
    })),
}));
