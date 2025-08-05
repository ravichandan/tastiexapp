// state/useFiltersStore.ts
import { CuisineType, DietaryType } from '@/types/Types';
import { create } from 'zustand';

interface FiltersState {
  cuisines: CuisineType[];
  dietaryOptions: DietaryType[];
  setFilters: (cuisines: CuisineType[], dietaryOptions: DietaryType[]) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  cuisines: [],
  dietaryOptions: [],
  setFilters: (cuisines, dietaryOptions) => set({ cuisines, dietaryOptions }),
}));
