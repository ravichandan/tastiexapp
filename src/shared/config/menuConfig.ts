// shared/config/menuConfig.ts
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
