import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // comes built-in with Expo
import { theme } from "../theme";

type RatingStarsProps = {
  rating: number; // e.g. 3.5, 4, etc
  max?: number;   // default 5
  size?: number;  // star size
  color?: string; // filled star color
};

export const RatingStars = ({
  rating,
  max = 5,
  size = 18,
  color = theme.colors.themeColor, // gold
}: RatingStarsProps) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FontAwesome key={i} name="star" size={size} color={color} />);
    } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
      stars.push(
        <FontAwesome key={i} name="star-half-full" size={size} color={color} />
      );
    } else {
      stars.push(<FontAwesome key={i} name="star-o" size={size} color={color} />);
    }
  }

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};
