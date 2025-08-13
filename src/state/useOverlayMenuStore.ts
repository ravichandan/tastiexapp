// src/state/useOverlayMenu.ts
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

type OverlayMenuState = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

export const useOverlayMenuStore = create<OverlayMenuState>()(
  subscribeWithSelector(
    devtools((set) => ({
      isOpen: false,
      openMenu: () => set({ isOpen: true }),
      closeMenu: () => set({ isOpen: false }),
    })
  )),
);
