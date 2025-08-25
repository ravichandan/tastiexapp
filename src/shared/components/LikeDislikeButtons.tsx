import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Expo's icon pack
import { theme } from "../theme";

type Props = {
  initialLikes?: number;
  initialDislikes?: number;
  onLike?: () => void;
  onDislike?: () => void;
  size?: number;
};

export const LikeDislikeButtons = ({
  initialLikes = 0,
  initialDislikes = 0,
  onLike,
  onDislike,
  size = 22,
}: Props) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => {
    if (userVote === "like") {
      setLikes((prev) => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === "dislike") setDislikes((prev) => prev - 1);
      setLikes((prev) => prev + 1);
      setUserVote("like");
      onLike?.();
    }
  };

  const handleDislike = () => {
    if (userVote === "dislike") {
      setDislikes((prev) => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === "like") setLikes((prev) => prev - 1);
      setDislikes((prev) => prev + 1);
      setUserVote("dislike");
      onDislike?.();
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
      {/* 👍 Like */}
      <TouchableOpacity
        onPress={handleLike}
        style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}
      >
        <FontAwesome
          name={userVote === "like" ? "thumbs-up" : "thumbs-o-up"} // solid vs outline
          size={size}
          color={theme.colors.themeColor} // blue if selected
        />
        {/* <Text style={{ marginLeft: 6, fontSize: 14 }}>{likes}</Text> */}
      </TouchableOpacity>

      {/* 👎 Dislike */}
      <TouchableOpacity
        onPress={handleDislike}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <FontAwesome
          name={userVote === "dislike" ? "thumbs-down" : "thumbs-o-down"} // solid vs outline
          size={size}
          color={theme.colors.themeColor} // red if selected
        />
        {/* <Text style={{ marginLeft: 6, fontSize: 14 }}>{dislikes}</Text> */}
      </TouchableOpacity>
    </View>
  );
};
