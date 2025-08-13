export type DietaryType = {
  id: number;
  name: string;
  value: number;
};

export enum Cuisine {
  INDIAN= 'Indian',
  ITALIAN= 'Italian',
  CHINESE='Chinese',
  JAPANESE='Japanese',
  MIDDLE_EAST='Middle East',
  MEXICAN='Mexican',
  GREEK='Greek',
  AFRICAN='African'
}
export type CuisineType = typeof Cuisine[keyof typeof Cuisine];

export type RatingInfo = {
  ambience: number;
  service: number;
  taste: number;
  presentation: number;
  reviewsCount: number;
  noOfRatings: number
};

export type Media = {
  id: string;
  url: string;
  type: 'image' | 'video';
  key: string; // S3 key or similar identifier
};

export type PlaceItem = {
  id: string;
  _id: string;
  name: string;
  medias: Array<Media>;
  ratingInfo?: RatingInfo;
};
export type Item = {
  id: string;
  _id: string;
  name: string;
  medias: Array<Media>;
  placeItem?: PlaceItem;
};

export type Place = {
  id: string;
  _id: string;
  placeName: string;
  location: string;
  ambience: number;
  service: number;
  medias: Array<Media>;
  address: {
    suburb: string;
    street: string;
  };
  ratingInfo?: RatingInfo;
  items: Array<Item>;
}
