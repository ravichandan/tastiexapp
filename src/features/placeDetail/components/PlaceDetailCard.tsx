// components/DishCard.tsx
import { Place } from '@/types/Types';
import { View, Text, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Constants from 'expo-constants';
import { theme } from '@/shared/theme';
import { MapPin, Store, UtensilsCrossed } from 'lucide-react-native';
import SmoothText from '@/shared/components/SmoothText';
import { TEXT_LABELS } from '@/shared/config/menuConfig';
import TxButton from '@/shared/components/TxButton';

export default function PlaceDetailCard({ place }: { place: Place }) {
  return (
    <View style={styles.card}>
      {/* Restaurant Info */}
      <View style={styles.header} className="py-2">
        <View className="flex-row my-2">
          <View style={styles.iconContainer}>
            <UtensilsCrossed size={20} style={styles.icon} />
          </View>
          <Text style={[styles.headerText, { fontSize: 18, fontWeight: 'bold' }]}>{place?.placeName}</Text>
        </View>
        {/* <View className="flex-row my-1">
          <View style={styles.iconContainer}>
            <Store size={16} style={styles.icon} />
          </View>
          <Text style={[styles.headerText, { fontSize: 16, fontWeight: 'medium' }]}>{place.placeName}</Text>
        </View> */}
        <View className="flex-row my-1">
          <View style={styles.iconContainer}>
            <MapPin size={14} style={styles.icon} />
          </View>
          <Text style={[styles.headerText, { fontSize: 14 }]}>{place.address.suburb}</Text>
        </View>
      </View>
      {/* Image Carousel */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + place?.medias?.at(0)?.key,
          }}
          style={styles.image}
        />

        {/* {place?.medias && <Carousel
        width={400}
        height={250}
        data={place?.medias.map((media) => ({
          uri: `${Constants.expoConfig?.extra?.bucketAccessEndpoint}/${media.key}`
        }))} 
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={{ width: "100%", height: 250 }} />
        )}
      />} */}
      </View>

      {/* Other details */}
      <View style={styles.bodyContainer} className=" gap-4 ">
        {/* price & ratings block */}

        <View className="flex-row ">
          <View style={styles.dishRatingContainer} className="w-1/2 justify-center ps-3">
            <View style={styles.dishRating}>
              <SmoothText>{TEXT_LABELS.AMBIENCE}: </SmoothText>
              <SmoothText>
                {' '}
                <SmoothText className="font-bold ">{place?.ratingInfo?.ambience}</SmoothText>
                <SmoothText className="text-sm">/5 ({place?.ratingInfo?.noOfRatings})</SmoothText>
              </SmoothText>
            </View>
            <View style={styles.dishRating}>
              <SmoothText>{TEXT_LABELS.SERVICE}: </SmoothText>
              <SmoothText>
                {' '}
                <SmoothText className="font-bold ">{place?.ratingInfo?.service}</SmoothText>
                <SmoothText className="text-sm">/5 ({place?.ratingInfo?.noOfRatings})</SmoothText>
              </SmoothText>
            </View>
          </View>
        </View>

        {/* <View> <SmoothText>{place?.description || place?.items?.at(0)?.description || 'NA'}</SmoothText></View>
        <View> <SmoothText>Allergens: {place?.allergens?.join(', ') || 'NA'}</SmoothText></View>
        <View> <SmoothText>Calories: {`${place?.calories?.count || 'NA'} ${place?.calories?.unit || ''}`}</SmoothText></View> */}
        <View>
          {' '}
          <TxButton label="Review this item" variant="dark"></TxButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...theme.card,
  card: {
    ...theme.card.card,
    flex: 0,
    // height: undefined,
    // maxHeight: undefined,
    height: 325,
    // maxHeight: 325,
    marginVertical: theme.spacing.sm,
    borderWidth: 0,
  },
  header: {
    ...theme.card.header,
    height: 105,
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: 18,
  },
  headerText: {
    ...theme.card.headerText,
    color: theme.colors.textLight,
    fontWeight: 'normal',
  },
  bodyContainer: {
    // ...theme.card.bodyContainer,
    marginVertical: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: 8,
    borderWidth: 1,
  },
  content: { flexDirection: 'row' as const, alignItems: 'center' as const, marginVertical: 3 },
  contentText: { color: theme.colors.textLight, marginLeft: theme.spacing.xs },
  iconContainer: { width: 27, marginHorizontal: theme.spacing.xs },
  icon: { color: theme.colors.textLight, marginRight: theme.spacing.xs, width: 115 },
  imageContainer: {
    height: 350,
  },
  image: {
    height: 350,
  },
  rating: { color: theme.colors.textLight, fontSize: 12 },
  dishRow: { flexDirection: 'row' as const, marginTop: theme.spacing.sm, alignItems: 'center' as const },
  dishName: { fontWeight: '600' as const, textTransform: 'capitalize' },
  dishRatingContainer: {},
  dishRating: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
  },
});
