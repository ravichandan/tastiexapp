// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View className="flex-1 items-center justify-center bg-white">
//       <SmoothText className="text-xl font-bold text-blue-500">Hello from NativeWind 👋</SmoothText>
//     </View>
//     // <View style={styles.container}>
//     //   <SmoothText>Open up App.tsx to start working on your app!</SmoothText>
//     //   <StatusBar style="auto" />
//     // </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { Image, ScrollView, Text, View } from 'react-native';
import '../../global.css';
import AppLayout from './AppLayout';
import Navigation from '@/navigation/AppNavigator';
import * as Font from "expo-font";
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import AppLoading from "expo-app-loading"; // optional, for splash while loading

// import { useDishStore } from '../state/useDishStore';

// const user = useDishStore((state) => state.user);
// const login = useDishStore((state) => state.login);


// import wdyr from '@welldone-software/why-did-you-render';
// wdyr(React);

export default function App() {


  console.log('in app.tsx');

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "OpenSans-Regular": require("@/assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
      "OpenSans-Bold": require("@/assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
      "OpenSans-Italic": require("@/assets/fonts/Open_Sans/OpenSans-Italic.ttf"),
      "OpenSans-Light": require("@/assets/fonts/Open_Sans/OpenSans-Light.ttf"),
      "OpenSans-SemiBold": require("@/assets/fonts/Open_Sans/OpenSans-SemiBold.ttf"),
    });
  };
  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    }).catch((error) => {
      console.error('Error loading fonts:', error);
    });
  }, []);
  
  if (!fontsLoaded) {
    return (
      <Text >Loading fonts...</Text>
      // <AppLoading
      //   startAsync={loadFonts}
      //   onFinish={() => setFontsLoaded(true)}
      //   onError={console.warn}
      // />
    );
  }
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
    // <View className="flex-1 bg-white">
    //   {/* 🔲 Header with logo on black */}
    //     <View className="bg-black items-center justify-center py-6">
    //       <Image
    //         source={require('@/assets/logo1.png')} // <-- use your actual logo path
    //         resizeMode="contain"
    //         style={{ height: 60, width: 200 }}
    //       />
    //     </View>

    //     {/* 🧾 Main scrollable content */}
    //     <ScrollView contentContainerStyle={{ padding: 16 }}>
    //       {/* Replace the below with actual content like cards, sections, etc */}

    //       {/* <View className="mt-4"> */}
    //         <SmoothText>hello</SmoothText><Navigation />
    //         <SmoothText>hello</SmoothText>
    //         {/* Example content block */}
    //       {/* </View> */}
    //     </ScrollView>

    //   </View>
  );
}
