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
  searchPerformed: boolean;
  isLoading: boolean;
  error: string | null;
  setFilters: (filters: FiltersSnapshot) => void;
  setPopularPlaces: (data: SearchResult) => void;
  setPopularItems: (data: SearchResult) => void;
  setLoading: (loading: boolean) => void;
  setSearchPerformed: (searchPerformed: boolean) => void;
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
  searchPerformed: false,
  error: null,
  setFilters: (filters) => set({ filters }),
  setPopularPlaces: (data) => set({ popularPlaces: data }),
  setPopularItems: (data) => set({ popularItems: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setSearchPerformed: (searchPerformed) => set({ searchPerformed }),
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
    set({
      filters,
      popularPlaces: popularPlaces || { pageNumber: 0, pageSize: 10, results: [], total: 0 },
      popularItems: popularItems || { pageNumber: 0, pageSize: 10, results: [], total: 0 },
      isLoading: false,
      error: undefined,
    }),
}));
