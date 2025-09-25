export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Search: undefined;
  About: undefined;
  PlaceDetail: { placeId: string; };
  DishDetail: { placeId: string; dishId: string };
  NewReview: { placeId?: string; placeItemId?: string };
  // Search: { query?: string }; // if Search takes params

  // add other screens here
};
