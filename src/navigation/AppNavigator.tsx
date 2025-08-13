import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/home/screens/HomeScreen';
import SearchScreen from '../features/search/screens/SearchScreen';
import { RootStackParamList } from './types';
import AppLayout from '@/app/AppLayout';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Navigation.tsx

export default function Navigation() {
  console.log('in app.navigator.tsx');
  return (
    <NavigationContainer>
      <AppLayout />
    </NavigationContainer>
  );
}
