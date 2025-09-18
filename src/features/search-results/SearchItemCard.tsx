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
  const placeItem = item.places?.at(0)?.placeItem;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // logger.debug('item in SearchItemCard', item.places?.at(0));
  return (
    <TouchableOpacity style={styles.card} key={item?._id} onPress={() => navigation.navigate('DishDetail', { placeId: item.places!.at(0)!._id, dishId: item?._id })}>
      <View style={styles.header}>
        <View>
          <SmoothText style={styles.title} className="capitalize">{item.name}</SmoothText>
          <View style={styles.location}>
            <MapPin size={14} style={styles.locationIcon} />
            <SmoothText className="capitalize" style={styles.locationText}>{item.places?.at(0)?.address?.suburb}</SmoothText>
          </View>
        </View>
      </View>

      {placeItem && (
        <View style={styles.dishRow}>
          <Image
            source={{
              uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + item?.medias?.at(0)?.key,
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
  //   card: {
  //     // marginBottom: theme.spacing.sm,
  //     flex: 1,
  //     // height: 2000,
  //     backgroundColor: theme.colors.surface,
  //     // borderBottomEndRadius: theme.radius.sm,
  //     borderRadius: theme.radius.md,
  //     borderColor: theme.colors.textSecondary,
  //     borderWidth: 0.5,
  //     // borderColor: theme.colors.buttonPrimary,
  //     // padding: theme.spacing.sm,
  //         // shadow for iOS
  //     // shadowColor: "#000",
  //     // shadowOpacity: 0.1,
  //     // shadowRadius: 4,
  //     // shadowOffset: { width: 0, height: 2 },

  //     // shadow for Android
  //     // elevation: 2,
  //   },
  //   header: {
  //     backgroundColor: theme.colors.backgroundColor,
  //     borderTopLeftRadius: theme.radius.sm,
  //     borderTopRightRadius: theme.radius.sm,
  //     padding: theme.spacing.sm,
  //     // borderTopWidth: 1,
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     borderColor: '#000',
  //     // marginBottom: theme.spacing.sm,
  //   },
  //   title: { fontSize: 16, fontWeight: "bold" },
  //   location: { flexDirection: "row", alignItems: "center" },
  //   locationText: { marginLeft: 4, color: "#666" },
  //   rating: { fontSize: 12, color: "#555" },
  //   dishRow: { flexDirection: "row", marginTop: 8 },
  //   dishImage: { width: 50, height: 50, borderRadius: 4, marginRight: 8 },
  //   dishName: { fontWeight: "600" },
  //   dishRating: { fontSize: 12, color: "#555" },
  ...theme.card,
  card: {
    ...theme.card.card,
    margin: 0,
  },
  location: { color: theme.colors.textLight, flexDirection: 'row' as const, alignItems: 'center' as const },
  locationText: { color: theme.colors.textLight, marginLeft: theme.spacing.xs },
  locationIcon: { color: theme.colors.textLight, marginRight: theme.spacing.xs },
  rating: { color: theme.colors.textLight, fontSize: 12 },
  dishRow: { flexDirection: 'row' as const, marginTop: theme.spacing.sm, alignItems: 'center' },
  dishImage: { width: 50, height: 50, borderRadius: theme.radius.md, marginHorizontal: theme.spacing.sm },
  dishName: { fontWeight: '600' as const, textTransform: 'capitalize' },
  dishRating: {
    fontSize: 12,
    flexDirection: 'row' as const,
    width: '100%',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
