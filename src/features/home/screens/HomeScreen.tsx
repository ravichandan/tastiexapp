import { View, Text, Button, ScrollView, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../../navigation/types'; // adjust path if needed
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useAuthStore } from '../../../state/useAuthStore';
// import LoginForm from '@/features/auth/components/LoginForm';
import SearchBar from '@/features/search/screens/SearchBar';
import { useEffect, useState } from 'react';
import { useFilters } from '../hooks/useFilters';
import SearchButton from '@/features/search/screens/SearchButton';
import FilterAccordion from '@/features/search/screens/FilterAccordion';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ }: Props) {
  // const user = useAuthStore((state) => state.user);
  // const login = useAuthStore((state) => state.login);
  // const logout = useAuthStore((state) => state.logout);
  
  const [showFilters, setShowFilters] = useState(false);
  const { cuisines, dietaryOptions, loading, error } = useFilters();



  // useEffect(() => {
  //   // fetchFilterData();
  // }, []);
  console.log('in home screen');
//   if (loading) return <ActivityIndicator />;
// if (error) return <Text>{error}</Text>;
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SearchBar onToggleFilters={() => setShowFilters((prev) => !prev)} />
      
      {showFilters && (
        <FilterAccordion cuisines={cuisines} dietaryOptions={dietaryOptions} />
      )}

      <SearchButton />
    </ScrollView>
    // <View className="flex-1 items-center justify-center bg-white">
    //   <View
    //     className="flex-1 items-center justify-center bg-white"
    //     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <Text>Welcome to Tastiex! 🍽️</Text>
    //     <Button title="Search Dishes" onPress={() => navigation.navigate('Search')} />

    //   </View>

    //   <Text className="text-xl mb-4">{user ? `Welcome, ${user.name}!` : 'You are not logged in.'}</Text>

    //   {!user ? (
    //     <Button title="Login" onPress={() => login({ id: '123', name: 'Chandan' }, 'token_abc')} />
    //   ) : (
    //     <Button title="Logout" onPress={logout} />
    //   )}
    // </View>
  );
}
