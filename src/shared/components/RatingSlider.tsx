import React, { useState } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { Star } from "lucide-react-native";

type RatingSliderProps = {
  initial?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
};

const RatingSlider: React.FC<RatingSliderProps> = ({
  initial = 0,
  max = 5,
  step = 0.5,
  onChange,
}) => {
  const [rating, setRating] = useState(initial);

  const handleChange = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <View style={{ alignItems: "center", paddingVertical: 16 }}>
      {/* Stars preview */}
      {/* <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = i + 1 <= rating;
          const halfFilled = !filled && i + 0.5 <= rating;

          return (
            <Star
              key={i}
              size={28}
              color="#FFD700"
              fill={filled || halfFilled ? "#FFD700" : "transparent"}
            />
          );
        })}
      </View> */}

      {/* Slider */}
        {/* Numeric display */}
      <Text style={{ marginBottom: 8, fontSize: 16 }}>
        {rating.toFixed(1)} / {max}
      </Text>
      <Slider
        style={{ width: '100%', height: 40, transform: [{ scaleY: 1 }] }}
        minimumValue={0}
        maximumValue={max}
        step={step}
        value={rating}
        minimumTrackTintColor="#FFD700"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#FFD700"
        onValueChange={handleChange}
      />


    </View>
  );
};

export default RatingSlider;
