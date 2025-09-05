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
  // reviewsCount: number;
  noOfRatings: number
  noOfReviews: number
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
  description: string;
  medias: Array<Media>;
  media: Media;
  ratingInfo?: RatingInfo;
  places?: Place[];
  place?: Place;
  allergens?: FoodAllergens[];
  price?: number;
  calories?: CalorieInfo;
  item: string; // stores objectId of item
};
export type Item = {
  id: string;
  _id: string;
  name: string;
  medias: Array<Media>;
  places?: Place[];
  placeItem?: PlaceItem;
  description: string;
};

export enum FoodAllergens {
  MILK = 'Milk',
  EGGS = 'Eggs',
  FISH = 'Fish',
  SHELLFISH = 'Crustacean shellfish',
  TREENUTS = 'Tree nuts',
  PEANUTS = 'Peanuts',
  WHEAT = 'Wheat',
  SOYBEANS = 'Soybeans',
}

export enum CalorieUnit {
  kJ = 'kJ',
  kcal = 'kcal',
}
export type CalorieInfo = {
  count: number;
  unit: CalorieUnit;
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
  placeItems: Array<PlaceItem>;
  placeItem: PlaceItem;
}

export type SuburbType = {
  id?: number;
  name: string;
  postcode: string;
};

export type Review = {
    _id: string;
  description: string;
  service: number;
  ambience: number;
  taste: number;
  presentation: number;
  medias: Media[];
  customer: CustomerInfo;
  place: Place;
  item: Item;
  placeItem: any;
  helpful: number;
  notHelpful: number;
  noOfReplies: number;
  info: ReviewThread;
  children: Review[];
  modifiedAt: Date;
};
export type ReviewThread = {
  _id: string;
  likedBy: CustomerInfo[];

}

export type CustomerInfo = {
  _id: string;
  name: string;
  picture?: Media;
  email?: string;
  interestedIn: Cuisine[];
  allergens: FoodAllergens[];
  reviewedOn?: Date;
  totalPointsEarned: number;
  status: string;
  claimablePoints: number;
  level: ActivityLevels;
}

export enum ActivityLevels {
  BASIC = 'BASIC',
  FOODIE = 'FOODIE',
  INFLUENCER = 'INFLUENCER',
}