// components/PopularItemCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Store } from 'lucide-react-native';
import { Item, PlaceItem } from '@/types/Types';
import { theme } from '@/shared/theme';
import SmoothText from '@/shared/components/SmoothText';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

const MemoizedPopularItemCard = React.memo(PopularItemCard);

export default MemoizedPopularItemCard;


function PopularItemCard({ item }: { item: PlaceItem }) {
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  return (
    <TouchableOpacity style={styles.card} key={item?._id} onPress={() => navigation.navigate('DishDetail', { placeId: item.place!._id, dishId: item?.item })}>
      <View style={styles.header}>
        <SmoothText style={styles.headerText}>{item.name}</SmoothText>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + item?.media?.key,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'column', marginVertical: 3 }}>
          <View style={styles.dishRating}>
            <SmoothText>Taste: </SmoothText>
            <SmoothText>
              {' '}
              {item?.ratingInfo?.taste} /
              <SmoothText className="text-sm">5 ({item?.ratingInfo?.noOfRatings})</SmoothText>
            </SmoothText>
          </View>
          <View style={styles.dishRating}>
            <SmoothText className="text-sm">Presentation: </SmoothText>
            <SmoothText>
              {' '}
              {item?.ratingInfo?.presentation} /
              <SmoothText className="text-sm">5 ({item?.ratingInfo?.noOfRatings})</SmoothText>
            </SmoothText>
          </View>
        </View>
        <View style={styles.content}>
          <Store size={14} style={styles.locationIcon} />
          <SmoothText className="capitalize truncate w-40">{item.place?.placeName}</SmoothText>
        </View>
        <View style={styles.content}>
          <MapPin size={14} style={styles.locationIcon} />
          <SmoothText className="capitalize text-sm">{item.place?.address?.suburb}</SmoothText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ...theme.card,
  card: {
    ...theme.card.card,
    height: 325,
    maxHeight: 325,
    marginVertical: theme.spacing.sm,
  },
  header: {
    ...theme.card.header,
    height: 55,
  },
  headerText: {
    ...theme.card.headerText,
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
