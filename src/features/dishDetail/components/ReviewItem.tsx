// components/DishCard.tsx
import { Review } from "@/types/Types";
import { View, Text, Image } from "react-native";

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <View>
      <Text>{review.user.name}</Text>
      <Text>{review.comment}</Text>
      <Text>{review.rating}</Text>
    </View>
  );
}
