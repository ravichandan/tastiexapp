import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';
import {randomUUID} from 'expo-crypto';

import { CustomerInfo, Media, NewReview, Place, PlaceItem } from '@/types/Types';

interface ReviewFormStore {
  review?: NewReview;

  setDescription: (description: string) => void;
  setAmbience: (ambience: number) => void;
  setService: (service: number) => void;
  setTaste: (taste: number) => void;
  setPresentation: (presentation: number) => void;
  setMedias: (medias: Media[]) => void;
  setCustomer: (customer: CustomerInfo | string) => void;
  setPlace: (place: Place) => void;
  setItem: (item: PlaceItem) => void;
  /**
   * returns the index
   */
  addChild(): string;
  removeChild(id: string): void;
  resetForm: () => void;
}

export const useReviewFormStore = create<ReviewFormStore>((set) => ({
  review: { uuid: randomUUID() },

  setDescription: (description) => set((state) => ({ review: { ...state.review!, description } })),
  setAmbience: (ambience) => set((state) => ({ review: { ...state.review!, ambience } })),
  setService: (service) => set((state) => ({ review: { ...state.review!, service } })),
  setTaste: (taste) => set((state) => ({ review: { ...state.review!, taste } })),
  setPresentation: (presentation) => set((state) => ({ review: { ...state.review!, presentation } })),
  setMedias: (medias) => set((state) => ({ review: { ...state.review!, medias } })),
  setCustomer: (customer) => set((state) => ({ review: { ...state.review!, customerInfo: customer } })),
  setPlace: (place) => set((state) => ({ review: { ...state.review!, place } })),
  setItem: (item) => set((state) => ({ review: { ...state.review!, item } })),

  addChild: () => {
    let id = '';
    set((state) => {
      const uuid = randomUUID();
      const newChildren = state.review?.children
        ? [...state.review.children, { uuid }]
        : [{ uuid }];
    //   id = newChildren.length - 1;
      id = uuid;
      return {
        review: {
          ...state.review!,
          children: newChildren,
        },
      };
    });
    return id;
  },

  removeChild: (id) =>
    set((state) => ({
      review: { ...state.review!, children: state.review?.children?.filter((child) => child.uuid !== id) },
    })),

  resetForm: () => set({ review: { uuid: randomUUID() } }),
}));
