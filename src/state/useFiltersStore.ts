// state/useFiltersStore.ts
import { CuisineType, DietaryType } from '@/types/Types';
import { create } from 'zustand';

interface FiltersState {
  // options fetched from backend
  cuisinesOptions: CuisineType[];
  dietaryOptions: DietaryType[];

  // currently selected filters (editable)
  selectedCuisines: CuisineType[];
  selectedDietary: DietaryType[];

//   isLoading: boolean;
//   error: string | null;

  // setters
  setCuisinesOptions: (items: CuisineType[]) => void;
  setDietaryOptions: (items: DietaryType[]) => void;
  setSelectedCuisines: (items: CuisineType[]) => void;
  setSelectedDietary: (items: DietaryType[]) => void;
  clearSelectedFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  cuisinesOptions: [],
  dietaryOptions: [],
  selectedCuisines: [],
  selectedDietary: [],

  setCuisinesOptions: (items: CuisineType[]) => set({ cuisinesOptions: items }),
  setDietaryOptions: (items: DietaryType[]) => set({ dietaryOptions: items }),

//   isLoading: false,
//   error: null,

  setFilters: (cuisinesOptions: CuisineType[], dietaryOptions: DietaryType[]) => set({
    cuisinesOptions,
    dietaryOptions,
  }),
  setSelectedCuisines: (items: CuisineType[]) => set({ selectedCuisines: items }),
  setSelectedDietary: (items: DietaryType[]) => set({ selectedDietary: items }),

  clearSelectedFilters: () => set({ selectedCuisines: [], selectedDietary: [] }),
}));
