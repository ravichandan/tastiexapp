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
import { TEXT_LABELS } from '@/shared/config/menuConfig';
import { logger } from '@/shared/utils/logger';
import { TxImage } from '@/shared/components/TxImage';

export default function SearchItemCard({ item }: { item: Item }) {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // logger.debug('item in SearchItemCard', item);
  return (
    <TouchableOpacity
      style={styles.card}
      key={item?._id}
      onPress={() => navigation.navigate('DishDetail', { placeId: item.places!.at(0)!._id, dishId: item?._id })}>
      <View style={styles.header}>
        <SmoothText style={styles.title} className="capitalize">
          {item.name}
        </SmoothText>
      </View>

      <View className='ms-2'>
        <SmoothText className='text-slate-700 my-2 italic '>{TEXT_LABELS.SEARCH_RESULTS_SCREEN.DISHES.AVAILABLE_AT_LABEL} </SmoothText>
        {item.places?.map((place) => (
          <View style={styles.dishRow} key={place._id}>
            <TxImage
              uri={Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + place.placeItem?.media?.key}
              style={styles.dishImage}
            />
            {/* <Image
              source={{
                uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + place?.placeItem?.media?.key,
              }}
              style={styles.dishImage}
            />*/}
            <View> 
              {/* <SmoothText>{Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + place?.placeItem?.media?.key}</SmoothText> */}

              <SmoothText style={styles.dishName}>{place.placeName}</SmoothText>
              <View style={styles.location}>
                <MapPin size={14} style={styles.locationIcon} />
                <SmoothText className="capitalize" style={styles.locationText}>{place?.address?.suburb}</SmoothText>
              </View>
              <View style={{ flexDirection: 'column', width: 200 }}>
                {(!!place?.placeItem?.ratingInfo?.taste || !!place?.placeItem?.ratingInfo?.presentation) ? (
                  <>
                    <View style={styles.dishRating}>
                      <SmoothText>{TEXT_LABELS.TASTE}</SmoothText>
                      {place?.placeItem?.ratingInfo?.taste ? (
                        <SmoothText>
                          <SmoothText className="font-bold">{place.placeItem.ratingInfo.taste}</SmoothText>
                          <SmoothText>/5 ({place?.placeItem?.ratingInfo?.noOfRatings})</SmoothText>
                        </SmoothText>
                      ) : (
                        <SmoothText>{TEXT_LABELS.NOT_RATED_YET}</SmoothText>
                      )}
                    </View>
                    <View style={styles.dishRating}>
                      <SmoothText>{TEXT_LABELS.PRESENTATION}</SmoothText>
                      {place?.placeItem?.ratingInfo?.presentation ? (
                        <SmoothText>
                          <SmoothText className="font-bold">{place.placeItem.ratingInfo.presentation}</SmoothText>
                          <SmoothText>/5 ({place?.placeItem?.ratingInfo?.noOfRatings})</SmoothText>
                        </SmoothText>
                      ) : (
                        <SmoothText>{TEXT_LABELS.NOT_RATED_YET}</SmoothText>
                      )}
                    </View>
                  </>
                ) : (
                  <SmoothText className='text-sm italic text-gray-500 my-2 ms-1'>{TEXT_LABELS.NOT_RATED_YET}</SmoothText>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
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
    alignItems: 'center' as const,
  },
  location: { color: theme.colors.textLight, flexDirection: 'row' as const, alignItems: 'center' as const, marginTop: 1 },
  locationText: { color: theme.colors.textSecondary, marginLeft: theme.spacing.xs },
  locationIcon: { color: theme.colors.textSecondary, marginRight: theme.spacing.xs },
  rating: { color: theme.colors.textSecondary, fontSize: 12, justifyContent: 'flex-end', textAlign: 'right' as const },
  dishRow: { flexDirection: 'row' as const, marginTop: theme.spacing.sm, alignItems: 'center' },
  dishImage: { width: 70, height: 70, borderRadius: theme.radius.md, marginHorizontal: theme.spacing.sm },
  dishName: { fontWeight: '700' as const, textTransform: 'capitalize' },
  dishRating: {
    fontSize: 12,
    flexDirection: 'row' as const,
    width: '100%',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
