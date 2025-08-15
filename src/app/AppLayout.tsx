// AppLayout.tsx
import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '@/features/home/screens/HomeScreen';
// import SearchScreen from '@/features/search/screens/SearchScreen';
import SearchScreen from '@/features/search/screens/SearchScreen';
import HomeScreen from '@/features/home/screens/HomeScreen';
import BurgerIcon from '@/assets/icons/menu.svg';
import { RootStackParamList } from '@/navigation/types';
import { useOverlayMenuStore } from '@/state/useOverlayMenuStore';
import OverlayMenu from '@/shared/components/OverlayMenu';
import { useAuthStore } from '@/state';
import { theme as lightTheme } from '@/shared/theme';
import LoginForm from '@/features/auth/components/LoginForm';
import { eagerFetch } from './hooks/eagerFetch.hook';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppLayout() {
  // const openMenu = useOverlayMenuStore((state) => state.openMenu);
  // const openMen2u = useAuthStore((state) => state.login);

  const colorScheme = useColorScheme(); // returns 'light' | 'dark' | null
  const theme =
    // colorScheme === 'dark' ? lightTheme :
    lightTheme;

  const { fetchAvailableSuburbs } = eagerFetch();

  const openMenu = useOverlayMenuStore((state) => state.openMenu);
  console.log('in app layout');

  const loadAvailableSuburbs = async () => {
    await fetchAvailableSuburbs();
  };
  
  useEffect(() => {
    loadAvailableSuburbs().then(() => {
      console.log('Available suburbs loaded');
    }).catch((error) => {
      console.error('Error loading available suburbs:', error);
    });
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/* ✅ Persistent Header */}
      <View className="bg-black flex-row items-center  px-4 py-4">
        <TouchableOpacity onPress={openMenu} className="mx-3">
          <BurgerIcon width={24} height={24} fill="white" />
        </TouchableOpacity>
        <Image
          source={require('@/assets/fontspace1.png')}
          resizeMode="contain"
          className="mx-5"
          style={{ height: 40, width: 150 }}
        />
        {/* 🍔 Burger Menu icon (can hook to drawer later) */}
      </View>

      {/* ✅ Stack Navigator Content */}
      <View className="flex-1 bg-white">
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>

        <OverlayMenu />
        {/* Your custom overlay here */}
      </View>
    </View>
  );
}
