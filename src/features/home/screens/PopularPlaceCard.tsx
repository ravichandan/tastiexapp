// components/PopularPlaceCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Store } from 'lucide-react-native';
import { Place } from '@/types/Types';
import { theme } from '@/shared/theme';
import SmoothText from '@/shared/components/SmoothText';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

const MemoizedPopularItemCard = React.memo(PopularPlaceCard);

export default MemoizedPopularItemCard;

function PopularPlaceCard({ place }: { place: Place }) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
    <TouchableOpacity style={styles.card} key={place?._id} onPress={() => navigation.navigate('PlaceDetail', { placeId: place._id })}>
      <View style={styles.header}>
        <Store size={14} style={styles.locationIcon} />
        <SmoothText className="capitalize" style={styles.headerText}>{place?.placeName}</SmoothText>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + place?.medias?.at(0)?.key,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'column', marginVertical: 3 }}>
          <View style={styles.dishRating}>
            <SmoothText>Service: </SmoothText>
            <SmoothText>
              {' '}
              {place?.ratingInfo?.service} /
              <SmoothText className="text-sm">5 ({place?.ratingInfo?.noOfRatings})</SmoothText>
            </SmoothText>
          </View>
          <View style={styles.dishRating}>
            <SmoothText className="text-sm">Ambience: </SmoothText>
            <SmoothText>
              {' '}
              {place?.ratingInfo?.ambience} /
              <SmoothText className="text-sm">5 ({place?.ratingInfo?.noOfRatings})</SmoothText>
            </SmoothText>
          </View>
        </View>
        
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ...theme.card,
  card: {
    ...theme.card.card,
    height: 295,
  },
  header: {
    ...theme.card.header,
    height: 55,
    backgroundColor: theme.colors.backgroundDark
  },
  headerText: {
    ...theme.card.headerText,
    color: theme.colors.textLight,
    fontSize: 14,
  },
  content: { flexDirection: 'row' as const, alignItems: 'center' as const, marginVertical: 3 },
  contentText: { color: theme.colors.textLight, marginLeft: theme.spacing.xs },
  locationIcon: { color: theme.colors.textPrimary, marginRight: theme.spacing.xs },
  rating: { color: theme.colors.textLight, fontSize: 12 },
  dishRow: { flexDirection: 'row' as const, marginTop: theme.spacing.sm, alignItems: 'center' as const },
  dishName: { fontWeight: '600' as const, textTransform: 'capitalize' },
  dishRating: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
  },
});