import { View, Text, Button, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { RootStackParamList } from '../../../navigation/types'; // adjust path if needed
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useAuthStore } from '../../../state/useAuthStore';
// import LoginForm from '@/features/auth/components/LoginForm';
import SearchBar from '@/features/search/screens/SearchBar';
import { useEffect, useState } from 'react';
// import { useFilters } from '../hooks/useFilters';
import SearchButton from '@/features/search/screens/SearchButton';
import FilterAccordion from '@/features/search/screens/FilterAccordion';
import { useSearch } from '@/features/search/hooks/useSearch';
import { useSearchStore } from '@/state/useSearchStore';
import { SearchIcon, X } from 'lucide-react-native';
import { useFiltersStore } from '@/state/useFiltersStore';
import { CuisineType, DietaryType } from '@/types/Types';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ }: Props) {
  // const user = useAuthStore((state) => state.user);
  // const login = useAuthStore((state) => state.login);
  // const logout = useAuthStore((state) => state.logout);
  
  const [showFilters, setShowFilters] = useState(false);
  
  const { cuisinesOptions, dietaryOptions, fetchFilterOptions } = useSearch();
  const { performSearch, optionsError } = useSearch();
  const { searchKey, clear, isLoading: searchLoading, error: searchError } = useSearchStore();
  // const { cuisinesOptions, dietaryOptions, isLoading, error: } = useFiltersStore();
  const [query, setQuery] = useState(searchKey);


  useEffect(() => {
    if(searchKey){
      setQuery(searchKey);
      performSearch(searchKey);
    }
  }, []);
  console.log('in home screen');

  useEffect(() => {
    fetchFilterOptions();
  },[]);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      Keyboard.dismiss();
      performSearch(trimmed);
    } else {
      clear();
      console.warn('Please enter a search query');
    }
  };

  const handleChange = (text: string) => {
    setQuery(text);
    if (text.trim() === '') clear();
  };

  const handleClear = () => {
    setQuery('');
    clear();
    // Keyboard.dismiss();
  };

  const onSelectCuisine = (cuisine: CuisineType | null): void => {
    console.log('Selected cuisine:', cuisine);
    // If you want to trigger a search immediately:
    // if (cuisine) {
    //   performSearch(cuisine.name); // or use cuisine.id if needed
    //   setShowFilters(false); // Optionally close filters after selection
    // } else {
    //   clear();
    // }
  }

  const onSelectDietary = (dietary: DietaryType | null): void => {
    console.log('Selected dietary:', dietary);
    // If you want to trigger a search immediately:
    // if (dietary) {
    //   performSearch(dietary); // or use dietary.id if needed
    //   setShowFilters(false); // Optionally close filters after selection
    // } else {
    //   clear();
    // }
  }; 

//   if (loading) return <ActivityIndicator />;
// if (error) return <Text>{error}</Text>;
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SearchBar onToggleFilters={() => setShowFilters((prev) => !prev)} value={query} onChange={handleChange} onSearch={handleSearch} onClear={handleClear} />

      {showFilters && (
        <FilterAccordion cuisines={cuisinesOptions} dietaryOptions={dietaryOptions} onSelectCuisine={onSelectCuisine} onSelectDietary={onSelectDietary} />
      )}

      <SearchButton onClick={handleSearch} />
      {searchLoading && <ActivityIndicator />}
      {searchError && <Text className='text-red-500'>{searchError}</Text>}
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
