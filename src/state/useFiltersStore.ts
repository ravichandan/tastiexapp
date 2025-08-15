// state/useFiltersStore.ts
import { CuisineType, DietaryType, SuburbType } from '@/types/Types';
import { create } from 'zustand';

export interface LocationData {
  lat?: number;
  lng?: number;
  label?: string;
  name?: string; // optional, for better UX
  postcode?: string; // optional, for better UX
}

interface FiltersState {
  // options fetched from backend
  cuisinesOptions: CuisineType[];
  dietaryOptions: DietaryType[];
  suburbsOptions: SuburbType[];

  // currently selected filters (editable)
  selectedCuisines: CuisineType[];
  selectedDietary: DietaryType[];

  //   isLoading: boolean;
  //   error: string | null;
  location: LocationData | null;
  radius: string; // km as string for your Picker
  
  // setters
  setLocationName(name: string): void;
  setLocation: (l: LocationData) => void;
  setRadius: (r: string) => void;
  clearLocation: () => void;
  setCuisinesOptions: (items: CuisineType[]) => void;
  setDietaryOptions: (items: DietaryType[]) => void;
  setSuburbsOptions: (items: SuburbType[]) => void;
  setSelectedCuisines: (items: CuisineType[]) => void;
  setSelectedDietary: (items: DietaryType[]) => void;
  clearSelectedFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  cuisinesOptions: [],
  dietaryOptions: [],
  suburbsOptions: [],
  selectedCuisines: [],
  selectedDietary: [],

  location: null,
  radius: "50",
  setLocation: (location) => set({ location }),
  setLocationName: (name: string, postcode?: string) => set((state) => ({
    location:  { ...state.location, name, postcode },
  })),
  setRadius: (radius) => set({ radius }),
  
  setCuisinesOptions: (items: CuisineType[]) => set({ cuisinesOptions: items }),
  setDietaryOptions: (items: DietaryType[]) => set({ dietaryOptions: items }),
  setSuburbsOptions: (items: SuburbType[]) => set({ suburbsOptions: items }),

//   isLoading: false,
//   error: null,

  setFilters: (cuisinesOptions: CuisineType[], dietaryOptions: DietaryType[]) => set({
    cuisinesOptions,
    dietaryOptions,
  }),
  setSelectedCuisines: (items: CuisineType[]) => set({ selectedCuisines: items }),
  setSelectedDietary: (items: DietaryType[]) => set({ selectedDietary: items }),

  clearSelectedFilters: () => set({ selectedCuisines: [], selectedDietary: [] }),
  clearLocation: () => set({ location: null }),
  clear: () => set({ cuisinesOptions: [], dietaryOptions: [], selectedCuisines: [], selectedDietary: [], location: null, radius: "1"}),
  
}));
