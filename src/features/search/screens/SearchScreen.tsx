import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { RootStackParamList } from '../../../navigation/types';
import SmoothText from '@/shared/components/SmoothText';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SmoothText>Search for Dishes or Restaurants 🔍</SmoothText>
    </View>
  );
}
