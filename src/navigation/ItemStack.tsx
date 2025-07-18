import { View, Text, Button } from 'react-native';
import { RootStackParamList } from './types'; // adjust path if needed
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-white" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Foodiex! 🍽️</Text>
      <Button title="Search Dishes" onPress={() => navigation.navigate('Search')} />
    </View>
  );
}
 