import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';
import {randomUUID} from 'expo-crypto';

import { CustomerInfo, Media, NewReview, Place, PlaceItem } from '@/types/Types';

interface ReviewFormStore {
  review?: NewReview;

  setDescription: (childRef: NewReview, description: string) => void;
  setAmbience: (ambience: number) => void;
  setService: (service: number) => void;
  setTaste: (childRef: NewReview, taste: number) => void;
  setPresentation: (childRef: NewReview, presentation: number) => void;
  setMedias: (childRef: NewReview, medias: Media[]) => void;
  setCustomer: (customer: CustomerInfo | string) => void;
  setPlace: (place: Place) => void;
  setItem: (item: PlaceItem) => void;
  /**
   * returns the index
   */
  updateReview: (newReview: NewReview) => void;
  addChild(): string;
  removeChild(id: string): void;
  resetForm: () => void;
}

export const useReviewFormStore = create<ReviewFormStore>((set) => ({
  review: { uuid: randomUUID() },

  setDescription: (childRef, description) => set((state) => ({ 
    review: { 
      ...state.review!, 
      children:
        state.review?.children
        ? [...state.review.children.map(child => child.uuid === childRef.uuid ? {...child, description} : child)]
        : state.review?.children
    }})),
  setAmbience: (ambience) => set((state) => ({ review: { ...state.review!, ambience } })),
  setService: (service) => set((state) => ({ review: { ...state.review!, service } })),
  setTaste: (childRef, taste) => set((state) => ({ 
    review: { 
      ...state.review!, 
      children:
        state.review?.children
        ? [...state.review.children.map(child => child.uuid === childRef.uuid ? {...child, taste} : child)]
        : state.review?.children
    }})),
  setPresentation: (childRef, presentation) => set((state) => ({ 
    review: { 
      ...state.review!, 
      children:
        state.review?.children
        ? [...state.review.children.map(child => child.uuid === childRef.uuid ? {...child, presentation} : child)]
        : state.review?.children
    }})),
  setMedias: (childRef, medias) => set((state) => ({ 
    review: { 
      ...state.review!, 
      children:
        state.review?.children
        ? [...state.review.children.map(child => child.uuid === childRef.uuid ? {...child, medias} : child)]
        : state.review?.children
    }})),
  setCustomer: (customer) => set((state) => ({ review: { ...state.review!, customerInfo: customer } })),
  setPlace: (place) => set((state) => ({ review: { ...state.review!, place } })),
  setItem: (item) => set((state) => ({ review: { ...state.review!, item } })),

  updateReview: (newReview) => set((state) => ({ review: { ...state.review, ...newReview } })),
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
