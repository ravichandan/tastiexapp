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