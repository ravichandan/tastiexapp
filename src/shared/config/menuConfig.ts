// shared/config/menuConfig.ts
import { Cuisine } from '@/types/Types';
import { Home, LucideIcon, Search, User, Settings } from 'lucide-react-native';

export type MenuItem = {
  label: string;
  icon?: LucideIcon; // optional, if using emojis or icons later
  screen: string; // should match your route name
};

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', icon: Home, screen: 'Home' },
  { label: 'Cuisines', icon: Search, screen: 'Home' },
  { label: 'Deals', icon: User, screen: 'Home' },
  { label: 'My Activity', icon: User, screen: 'Home' },
  { label: 'Food Festivals', icon: User, screen: 'Home' },
  { label: 'Healthy', icon: User, screen: 'Home' },
  { label: 'Drinks', icon: User, screen: 'Home' },
  { label: 'Vegan Friendly', icon: User, screen: 'Home' },
  { label: 'Contact Us', icon: Settings, screen: 'Settings' },
  { label: 'T&Cs', icon: Settings, screen: 'Settings' },
];

export const CUISINES = [
  Cuisine.INDIAN,
  Cuisine.ITALIAN,
  Cuisine.CHINESE,
  Cuisine.JAPANESE,
  Cuisine.MIDDLE_EAST,
  Cuisine.MEXICAN,
  Cuisine.GREEK,
  Cuisine.AFRICAN,
];

export const DIETARIES = [
  {
    id: 1,
    name: 'Vegan',
    value: 1,
  },
  {
    id: 2,
    name: 'Vegetarian',
    value: 2,
  },
  {
    id: 3,
    name: 'Eggitarian (only egg)',
    value: 3,
  },
  {
    id: 4,
    name: 'Pescatarian (incl seafood)',
    value: 4,
  },
  {
    id: 5,
    name: 'Pollotarian (incl chicken)',
    value: 5,
  },
  {
    id: 6,
    name: 'Lambitarian (incl lamb or goat)',
    value: 6,
  },
  {
    id: 7,
    name: 'Halal',
    value: 7,
  },
  {
    id: 8,
    name: 'All meats',
    value: 10,
  },
];

export const FILTERS = [
  {
    label: 'Taste',
  },
  {
    label: 'Presentation',
  },
  {
    label: 'Service',
  },
  {
    label: 'Ambience',
  },
];
export const SORT_BY = [
  {
    label: 'Most Popular',
  },
  {
    label: 'Highest Rated',
  },
  {
    label: 'Lowest Price',
  },
  {
    label: 'Highest Price',
  },
  {
    label: 'Taste',
  },
  {
    label: 'Presentation',
  },
  {
    label: 'Service',
  },
  {
    label: 'Ambience',
  },
];
export const ITEM_DETAIL_SORT_BY = [
  {
    label: 'Recent Reviews',
  },
  {
    label: 'Most Useful',
  },
];
export const ITEM_DETAIL_FILTER_BY_ALLERGENS = [
  {
    label: 'Milk',
  },
  {
    label: 'Eggs',
  },
  {
    label: 'Fish',
  },
  {
    label: 'Shellfish',
  },
  {
    label: 'Tree nuts',
  },
  {
    label: 'Peanuts',
  },
  {
    label: 'Wheat',
  },
  {
    label: 'Soybeans',
  },
];
export const ITEM_DETAIL_FILTER_BY = [
  {
    label: 'Allergens',
  },
  {
    label: 'Dietary Preferences',
  },
];
export const ITEM_DETAIL_FILTER_BY_STARS = [
  {
    label: 'All',
  },
  {
    label: '5 Stars',
  },
  {
    label: '4 Stars',
  },
  {
    label: '3 Stars',
  },
  {
    label: '2 Stars',
  },
  {
    label: '1 Stars',
  },
];

export const ITEM_DETAIL_SHOW_ONLY_IMAGES_LABEL = 'Show only those reviews with images or videos';
