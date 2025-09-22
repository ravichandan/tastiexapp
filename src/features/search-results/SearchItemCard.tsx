// components/SearchItemCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Item } from '@/types/Types';
import { theme } from '@/shared/theme';
import SmoothText from '@/shared/components/SmoothText';
import Constants from 'expo-constants';
import { RootStackParamList } from '@/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export default function SearchItemCard({ item }: { item: Item }) {
  // const placeItem = item.places?.at(0)?.placeItem;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // logger.debug('item in SearchItemCard', item.places?.at(0));
  return (
    <TouchableOpacity style={styles.card} key={item?._id} onPress={() => navigation.navigate('DishDetail', { placeId: item.places!.at(0)!._id, dishId: item?._id })}>
      <View style={styles.header}>
        {/* <View> */}
          <SmoothText style={styles.title} className="capitalize">{item.name}</SmoothText>
          {/* <View style={styles.location}>
            <MapPin size={14} style={styles.locationIcon} />
            <SmoothText className="capitalize" style={styles.locationText}>{item.places?.at(0)?.address?.suburb}</SmoothText>
          </View> */}
        {/* </View> */}
      </View>

      {item.places?.map((it) => (
        <View style={styles.dishRow} key={it._id}>
          <Image
            source={{
              uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + it?.medias?.at(0)?.key,
            }}
            style={styles.dishImage}
          />
          <View>
            <SmoothText style={styles.dishName}>{item.name}</SmoothText>
            { placeItem.ratingInfo && (
              <View style={{ flexDirection: 'column', width: 200 }}>
                <View style={styles.dishRating}>
                  <SmoothText>Taste: </SmoothText>
                  <SmoothText><SmoothText className="font-bold">{placeItem?.ratingInfo?.taste ?? 'NA'}</SmoothText><SmoothText>/5 ({placeItem?.ratingInfo?.noOfRatings})</SmoothText></SmoothText>
                </View>
                <View style={styles.dishRating}>
                  <SmoothText>Presentation: </SmoothText>
                  <SmoothText><SmoothText className="font-bold">{placeItem?.ratingInfo?.presentation ?? 'NA'}</SmoothText><SmoothText>/5 ({placeItem?.ratingInfo?.noOfRatings})</SmoothText></SmoothText>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
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
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
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
