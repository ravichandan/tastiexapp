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

import '../../global.css';
import Navigation from '../navigation/AppNavigator';
// import { useDishStore } from '../state/useDishStore';

// const user = useDishStore((state) => state.user);
// const login = useDishStore((state) => state.login);

export default function App() {
  return <Navigation />;
}
