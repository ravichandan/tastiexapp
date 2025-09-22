// components/SearchPlaceCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Place } from '@/types/Types';
import { theme } from '@/shared/theme';
import SmoothText from '@/shared/components/SmoothText';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

export default function SearchPlaceCard({ place }: { place: Place }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  return (
    <TouchableOpacity style={styles.card} key={place._id} onPress={() => navigation.navigate('PlaceDetail', { placeId: place._id })}>
      <View style={styles.header}>
        <View>
          <SmoothText style={styles.title}>{place.placeName}</SmoothText>
          <View style={styles.location}>
            <MapPin size={14} style={styles.locationIcon} />
            <SmoothText style={styles.locationText}>{place.address.suburb}</SmoothText>
          </View>
        </View>
        <View>
          <SmoothText style={styles.rating}>Ambience: {place.ratingInfo?.ambience ?? 'NA'}</SmoothText>
          <SmoothText style={styles.rating}>Service: {place.ratingInfo?.service ?? 'NA'}</SmoothText>
        </View>
      </View>

      {place.items.slice(0, 3).map((item) => (
        <TouchableOpacity key={item._id} style={styles.dishRow} onPress={() => navigation.navigate('DishDetail', { placeId: place!._id, dishId: item?._id })}>
          <Image
            source={{
              uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + item.placeItem?.medias?.at(0)?.key,
            }}
            style={styles.dishImage}
          />
          <View>
            <SmoothText style={styles.dishName}>{item.name}</SmoothText>
            <View style={{ flexDirection: 'column', width: 230 }}>
              <View style={styles.dishRating}>
                <SmoothText>Taste: </SmoothText>
                <SmoothText>{
                item.placeItem?.ratingInfo?.taste 
                ? <SmoothText className="">{item.placeItem?.ratingInfo?.taste}/5 ({item.placeItem?.ratingInfo?.noOfRatings})</SmoothText> 
                : 'NA'}</SmoothText>
              </View>
              <View style={styles.dishRating}>
                <SmoothText>Presentation: </SmoothText>
                <SmoothText>{item.placeItem?.ratingInfo?.presentation ? <SmoothText className="">{item.placeItem?.ratingInfo?.presentation ?? 'NA'}</SmoothText> : 'NA'}/5 ({item.placeItem?.ratingInfo?.noOfRatings})</SmoothText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ...theme.card,
  card: {
    ...theme.card.card,
    margin: 0,
  },
  header: {
    ...theme.card.header,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const
  },
  location: { color: theme.colors.textLight, flexDirection: 'row' as const, alignItems: 'center' as const },
  locationText: { color: theme.colors.textLight, marginLeft: theme.spacing.xs },
  locationIcon: { color: theme.colors.textLight, marginRight: theme.spacing.xs },
  rating: { color: theme.colors.textLight, fontSize: 12, justifyContent: 'flex-end', textAlign: 'right' as const },
  dishRow: { flexDirection: 'row' as const, marginTop: theme.spacing.sm, alignItems: 'center' },
  dishImage: { width: 50, height: 50, borderRadius: theme.radius.md, marginHorizontal: theme.spacing.sm },
  dishName: { fontWeight: '700' as const, textTransform: 'capitalize' },
  dishRating: { fontSize: 12, flexDirection: 'row' as const, width: '100%', flex: 1, flexGrow: 1, justifyContent: 'space-between' },
});
