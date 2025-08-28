// components/ReviewItem.tsx
import SmoothText from "@/shared/components/SmoothText";
import { Review } from "@/types/Types";
import Constants from 'expo-constants';
import { Image, View } from "react-native";
import { format } from 'date-fns'
import { RatingStars } from "@/shared/components/RatingStars";
import { TEXT_LABELS } from '@/shared/config/menuConfig';
import { LikeDislikeButtons } from "@/shared/components/LikeDislikeButtons";

export default function ReviewItem({ review }: { review: Review }) {
  return ( review && 
    <View className="m-1 p-2 border border-gray-300 rounded-lg gap-2">

      {/* First customer pic and name */}
      <View className="flex-row items-center">
        <Image
          source={{
            uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + review.customer?.picture?.key,
          }}
           className="w-10 h-10 rounded-full" 
        />
        <SmoothText className="ml-2 font-bold">{review.customer.name}</SmoothText>
      </View>
      <View>
        <SmoothText className="text-gray-500 text-sm">
          {format(new Date(review.modifiedAt), "d MMMM, yyyy")}
        </SmoothText>
      </View>
      <View className="flex-col gap-1">
        <View className="flex-row items-center justify-between" style={{width: 200}}>
          <SmoothText>{TEXT_LABELS.TASTE}:</SmoothText>
          <View className="flex-row gap-2">
            <RatingStars rating={review.taste} size={18} />
            <SmoothText className="font-bold">({review.taste})</SmoothText>
          </View>
        </View>
        <View className="flex-row items-center justify-between" style={{width: 200}}>
          <SmoothText>{TEXT_LABELS.PRESENTATION}:</SmoothText>
          <View className="flex-row gap-2">
            <RatingStars rating={review.presentation} size={18} />
            <SmoothText className="font-bold">({review.presentation})</SmoothText>
          </View>
        </View>
      </View>
      <View>
        <SmoothText>{review.description}</SmoothText>
      </View>
      { review.medias?.map((media) => (
          <View>
            <Image
              source={{
                uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + media?.key,
              }}
              className="w-full "
              style={{ height: 220 }}
            />
          </View>
        ))
      }
      
      {/* 👍👎 Like / Dislike */}
      <View>
        <LikeDislikeButtons
          initialLikes={review.helpful}
          initialDislikes={review.notHelpful}
          onLike={() => console.log("Liked", review._id)}
          onDislike={() => console.log("Disliked", review._id)}
        />
        {review.info?.likedBy?.length > 0 && (
          <SmoothText className="text-gray-400">
            {review.info?.likedBy?.length} people found it helpful
          </SmoothText>
        )}
      </View>
    </View>
  );
}
