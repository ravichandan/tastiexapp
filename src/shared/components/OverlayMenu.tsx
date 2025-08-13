// components/OverlayMenu.tsx
import { View, Text, Pressable, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { MENU_ITEMS } from '../config/menuConfig';
import { useOverlayMenuStore } from '@/state/useOverlayMenuStore';
import { ComponentType, useEffect } from 'react';
import { useAuthStore } from '@/state';
import TxButton from './TxButton';
import { LucideProps } from 'lucide-react-native';
import SmoothText from './SmoothText';

export default function OverlayMenu() {
  const { isOpen, closeMenu } = useOverlayMenuStore();
  const user = useAuthStore(state=> state.user);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const translateX = useSharedValue(-300); // menu width

  // Animate open/close
  useEffect(() => {
    translateX.value = isOpen ? withTiming(0, { duration: 100 }) : withTiming(-300, { duration: 100 });
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
            {/* <SmoothText className="text-xl font-bold mb-4">🍽️ Menu</SmoothText> */}
            <View className="items-center mb-6">
              {user ? (
                <>
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/100' }} // or your user's profile pic
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <SmoothText className="text-xl font-semibold">Hi, Chandan 👋</SmoothText>
                </>
              ) : (
                <TxButton label="Login" variant="dark-outline" onPress={() => {navigation.navigate('Login'); closeMenu();}}></TxButton>
                // <TouchableOpacity onPress={() => {
                //   closeMenu();
                //   navigateTo('Login' as keyof RootStackParamList);
                // }}>
                //   <SmoothText className="text-white text-base font-medium">Log in</SmoothText>
                // </TouchableOpacity>
              )}
              
            </View>
            {MENU_ITEMS.map((item) => {
              const IconComponent = item.icon  as ComponentType<LucideProps>;
              return (
                <TouchableOpacity key={item.label} className="py-7 my-3 ps-9 border-b border-neutral-6900 bg-white/5  flex-row items-center shadow-sm"
                onPress={() => {navigateTo(item.screen as keyof RootStackParamList); closeMenu}}>
                  <IconComponent size={20} color="white" className="mr-2" />
                  <SmoothText className="text-lg text-white mx-2 px-3">{item.label}</SmoothText>
                </TouchableOpacity>
              );
            })}
            {/* {MENU_ITEMS.map((item) => {
              const a =1;
              <TouchableOpacity
                className="py-7 my-3 ps-9 border-b border-neutral-6900 bg-white/5   shadow-sm "
                key={item.label}
                onPress={() => navigateTo(item.screen as keyof RootStackParamList)}>
                <SmoothText className="text-lg  text-white">
                                const IconComponent = item.icon;
 {item.label}
                </SmoothText>
              </TouchableOpacity> */}
            {/* })} */}
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
}
