// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View className="flex-1 items-center justify-center bg-white">
//       <Text className="text-xl font-bold text-blue-500">Hello from NativeWind 👋</Text>
//     </View>
//     // <View style={styles.container}>
//     //   <Text>Open up App.tsx to start working on your app!</Text>
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
// import { useDishStore } from '../state/useDishStore';

// const user = useDishStore((state) => state.user);
// const login = useDishStore((state) => state.login);

export default function App() {
  console.log('in app.tsx');
  return (
    <Navigation />
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
    //         <Text>hello</Text><Navigation />
    //         <Text>hello</Text>
    //         {/* Example content block */}
    //       {/* </View> */}
    //     </ScrollView>

    //   </View>
  );
}
