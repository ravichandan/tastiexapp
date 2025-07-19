import { View, Text, Button } from 'react-native';
import { RootStackParamList } from '../navigation/types'; // adjust path if needed
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthStore } from '../state/useAuthStore';
import LoginForm from '@/features/auth/components/LoginForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View
        className="flex-1 items-center justify-center bg-white"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to Foodiex! 🍽️</Text>
        <Button title="Search Dishes" onPress={() => navigation.navigate('Search')} />

        <LoginForm />
      </View>

      <Text className="text-xl mb-4">{user ? `Welcome, ${user.name}!` : 'You are not logged in.'}</Text>

      {!user ? (
        <Button title="Login" onPress={() => login({ id: '123', name: 'Chandan' }, 'token_abc')} />
      ) : (
        <Button title="Logout" onPress={logout} />
      )}
    </View>
  );
}
