import { create } from 'zustand';
import { CuisineType, DietaryType } from '@/types/Types';

interface FiltersSnapshot {
  cuisines?: CuisineType[];
  dietaryOptions?: DietaryType[];
}

interface SearchResult {
  id: string;
  name: string;
  image?: string;
  [key: string]: any;
}

interface SearchState {
  searchKey: string;
  filters: FiltersSnapshot;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  setFilters: (filters: FiltersSnapshot) => void;
  setSearchKey: (key: string) => void;
  setResults: (data: SearchResult[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // convenience method to set all at once
  setSearchData: (payload: {
    searchKey: string;
    filters: FiltersSnapshot;
    results: any[];
  }) => void;
  clear: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchKey: '',
  filters: {},
  results: [],
  isLoading: false,
  error: null,
  setSearchKey: (key) => set({ searchKey: key }),
  setFilters: (filters) => set({ filters }),
  setResults: (data) => set({ results: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clear: () => set({ searchKey: '', results: [], filters: {}, error: undefined }),
  setSearchData: ({ searchKey, filters, results }) =>
    set({
      searchKey,
      filters: filters,
      results,
      isLoading: false,
      error: undefined,
    }),
}));
