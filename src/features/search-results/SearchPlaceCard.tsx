// components/SearchPlaceCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MapPin } from "lucide-react-native";
import { Place } from "@/types/Types";
import { theme } from "@/shared/theme";
import SmoothText from "@/shared/components/SmoothText";
// import { red100, red500 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function SearchPlaceCard({ place }: { place: Place }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <SmoothText style={styles.title}>{place.placeName}</SmoothText>
          <View style={styles.location}>
            <MapPin size={14} style={styles.locationIcon} />
            <SmoothText style={styles.locationText}>{place.address.suburb}</SmoothText>
          </View>
        </View>
        <View>
          <SmoothText style={styles.rating}>Ambience: {place.ratingInfo?.ambience}</SmoothText>
          <SmoothText style={styles.rating}>Service: {place.ratingInfo?.service}</SmoothText>
        </View>
      </View>

      {place.items.slice(0, 3).map((item) => (
        <View key={item._id} style={styles.dishRow}>
          <Image source={{ uri: item.medias?.at(0)?.url }} style={styles.dishImage} />
          <View>
            <SmoothText style={styles.dishName}>{item.name}</SmoothText>
            <SmoothText style={styles.dishRating}>
              Taste: {item.placeItem?.ratingInfo?.taste} / 5 ({item.placeItem?.ratingInfo?.noOfRatings})
            </SmoothText>
            <SmoothText style={styles.dishRating}>
              Presentation: {item.placeItem?.ratingInfo?.presentation} / 5 ({item.placeItem?.ratingInfo?.noOfRatings})
            </SmoothText>
          </View>
        </View>
      ))}
    </View>
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
});
