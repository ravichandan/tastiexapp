import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

interface ItemState {
  selectedCuisine: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setCuisine: (cuisine: string | null) => void;
}

export const useItemStore = create<ItemState>()(
  subscribeWithSelector(
    devtools((set) => ({
      selectedCuisine: null,
      searchTerm: "",
      setSearchTerm: (term) => set({ searchTerm: term }),
      setCuisine: (cuisine) => set({ selectedCuisine: cuisine }),
    }))
  )
);

useItemStore.subscribe(
  (state) => state.searchTerm,
  (searchTerm) => {
    console.log('searchTerm changed:', searchTerm);
  }
);