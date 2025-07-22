// shared/config/menuConfig.ts
export type MenuItem = {
  label: string;
  icon?: string; // optional, if using emojis or icons later
  screen: string; // should match your route name
};

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', icon: '🏠', screen: 'Home' },
  { label: 'Cuisines', icon: '🔍', screen: 'Home' },
  { label: 'Deals', icon: '👤', screen: 'Home' },
  { label: 'My Activity', icon: '👤', screen: 'Home' },
  { label: 'Food Festivals', icon: '👤', screen: 'Home' },
  { label: 'Healthy', icon: '👤', screen: 'Home' },
  { label: 'Drinks', icon: '👤', screen: 'Home' },
  { label: 'Vegan Friendly', icon: '👤', screen: 'Home' },
  { label: 'Contact Us', icon: '⚙️', screen: 'Settings' },
  { label: 'T&Cs', icon: '⚙️', screen: 'Settings' },
];
