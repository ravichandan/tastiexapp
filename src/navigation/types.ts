export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Search: undefined;
  PlaceDetail: { placeId: string; };
  DishDetail: { placeId: string; dishId: string };
  // Search: { query?: string }; // if Search takes params

  // add other screens here
};
