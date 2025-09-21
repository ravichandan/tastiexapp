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
import SearchResultsScreen from '@/features/search-results/SearchResultsScreen';
import { theme } from "@/shared/theme";
import SmoothText from '@/shared/components/SmoothText';
import SearchToolbar from '@/features/search/SearchToolbar';
import PopularsScreen from './PopularsScreen';
import { logger } from '@/shared/utils/logger';
import { set } from 'date-fns';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ }: Props) {
  
  const [showFilters, setShowFilters] = useState(false);
  
  const { cuisinesOptions, dietaryOptions, fetchFilterOptions } = useSearch();
  const { performSearch, optionsError } = useSearch();
  const { searchKey, clear, isLoading: searchLoading, error: searchError, setSearchKey, setSearchPerformed,  } = useSearchStore();
  const [query, setQuery] = useState(searchKey);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { location, radius, setSelectedCuisines, setSelectedDietary} = useFiltersStore();



  logger.debug('in home screen');

  useEffect(() => { 
    fetchFilterOptions();
  },[]);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      Keyboard.dismiss();
      // setSearchKey(trimmed);
      setQuery(trimmed);
      setSearchTriggered(true);
      // performSearch(trimmed);
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
    setSearchPerformed(false);
    setSearchTriggered(false);
    // Keyboard.dismiss();
  };

  const onSelectCuisine = (cuisine: CuisineType | null): void => {
    logger.debug('Selected cuisine:', cuisine);
    if (cuisine) {
      setSelectedCuisines([cuisine]);
    } else {
      setSelectedCuisines([]);
    }
    // If you want to trigger a search immediately:
    // if (cuisine) {
    //   performSearch(cuisine.name); // or use cuisine.id if needed
    //   setShowFilters(false); // Optionally close filters after selection
    // } else {
    //   clear();
    // }
  }

  const onSelectDietary = (dietary: DietaryType | null): void => {
    logger.debug('Selected dietary:', dietary);
    if (dietary) {
      setSelectedDietary([dietary]);
    } else {
      setSelectedDietary([]);
    }
    // If you want to trigger a search immediately:
    // if (dietary) {
    //   performSearch(dietary); // or use dietary.id if needed
    //   setShowFilters(false); // Optionally close filters after selection
    // } else {
    //   clear();
    // }
  }; 

    const handleShare = () => {
    // Use Share API or your flow
    logger.debug("Share:", { location, radius });
  };

  return (
    <View style={{ flex: 1 }} className="">
      <View style={{ padding: 16 }}>
        <SearchToolbar onShare={handleShare} ></SearchToolbar>
        <SearchBar onToggleFilters={() => setShowFilters((prev) => !prev)} value={query} onChange={handleChange} onSearch={handleSearch} onClear={handleClear} />

        {showFilters && (
          <FilterAccordion cuisines={cuisinesOptions} dietaryOptions={dietaryOptions} onSelectCuisine={onSelectCuisine} onSelectDietary={onSelectDietary} />
        )}
        <SearchButton style={{backgroundColor: theme.colors.buttonPrimary}} onClick={handleSearch} />
      </View>


      {searchTriggered ? <SearchResultsScreen query={query} setQuery={setQuery} /> : <PopularsScreen />}
      {searchLoading && <ActivityIndicator />}
      {searchError && <SmoothText className='text-red-500'>{searchError}</SmoothText>}
    </View>
    // <View className="flex-1 items-center justify-center bg-white">
    //   <View
    //     className="flex-1 items-center justify-center bg-white"
    //     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <SmoothText>Welcome to Tastiex! 🍽️</SmoothText>
    //     <Button title="Search Dishes" onPress={() => navigation.navigate('Search')} />

    //   </View>

    //   <SmoothText className="text-xl mb-4">{user ? `Welcome, ${user.name}!` : 'You are not logged in.'}</SmoothText>

    //   {!user ? (
    //     <Button title="Login" onPress={() => login({ id: '123', name: 'Chandan' }, 'token_abc')} />
    //   ) : (
    //     <Button title="Logout" onPress={logout} />
    //   )}
    // </View>
  );
}
