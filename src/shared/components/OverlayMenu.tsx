// components/OverlayMenu.tsx
import { View, Text, Pressable, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { MENU_ITEMS } from '../config/menuConfig';
import { useOverlayMenuStore } from '@/state/useOverlayMenuStore';
import { useEffect } from 'react';
import { useAuthStore } from '@/state';
import TxButton from './TxButton';

export default function OverlayMenu() {
  const { isOpen, closeMenu } = useOverlayMenuStore();
  const user = useAuthStore(state=> state.user);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const translateX = useSharedValue(-300); // menu width

  // Animate open/close
  useEffect(() => {
    translateX.value = isOpen ? withTiming(0, { duration: 300 }) : withTiming(-300, { duration: 200 });
  }, [isOpen]);

  // Animated style
  const menuStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (!isOpen) return null;

  const navigateTo = (screen: keyof RootStackParamList) => {
    closeMenu(); // first close
    navigation.navigate(screen); // then navigate
  };

  return (
    <View className="absolute inset-0 z-50 bg-black/60">
      <Pressable className="absolute inset-0" onPress={closeMenu} />

      <View className="absolute top-0 left-0 bottom-0 w-3/4 bg-black  shadow-lg">
        <Animated.View style={[menuStyle]} className="absolute left-0 top-0 bottom-0 w-full  bg-black">
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {/* <Text className="text-xl font-bold mb-4">🍽️ Menu</Text> */}
            <View className="items-center mb-6">
              {user ? (
                <>
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/100' }} // or your user's profile pic
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <Text className="text-xl font-semibold">Hi, Chandan 👋</Text>
                </>
              ) : (
                <TxButton label="Login" variant="dark-outline" ></TxButton>
                // <TouchableOpacity onPress={() => {
                //   closeMenu();
                //   navigateTo('Login' as keyof RootStackParamList);
                // }}>
                //   <Text className="text-white text-base font-medium">Log in</Text>
                // </TouchableOpacity>
              )}
              
            </View>
            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                className="py-7 my-3 ps-9 border-b border-neutral-6900 bg-white/5   shadow-sm "
                key={item.label}
                onPress={() => navigateTo(item.screen as keyof RootStackParamList)}>
                <Text className="text-lg  text-white">
                  {item.icon} {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
}
