import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../features/home/screens/HomeScreen';
// import SearchScreen from '../features/search/screens/SearchScreen';
// import { RootStackParamList } from './types';
import AppLayout from '@/app/AppLayout';
import { logger } from '@/shared/utils/logger';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// Navigation.tsx

export default function Navigation() {
  logger.debug('in app.navigator.tsx');
  return (
    <NavigationContainer>
      <AppLayout />
    </NavigationContainer>
  );
}
