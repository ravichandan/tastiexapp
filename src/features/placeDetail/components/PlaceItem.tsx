// components/ReviewItem.tsx
import SmoothText from "@/shared/components/SmoothText";
import { Item, Review } from "@/types/Types";
import Constants from 'expo-constants';
import { Image, View } from "react-native";
import { format } from 'date-fns'
import { RatingStars } from "@/shared/components/RatingStars";
import { TEXT_LABELS } from '@/shared/config/menuConfig';
import { LikeDislikeButtons } from "@/shared/components/LikeDislikeButtons";
import { useAuthStore } from "@/state/useAuthStore";

export default function PlaceItem({item, onFeedback }: { item: Item, onFeedback: (params: {reviewId: string, action: string}) => void }) {
  const user = useAuthStore((state) => state.user);
  // console.log('item::: ', item);
  return ( item && 
    <View className="mx-1 my-2  flex-row border border-gray-300 rounded-lg gap-2 w-screen">

      {/* First customer pic and name */}
      <View className="flex-row items-center">
        <Image
          source={{
            uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + item?.placeItem?.media?.key,
          }}
          className="size-28" 
        />
        {/* <SmoothText className="ml-2 font-bold">{item?.placeItem?.name}</SmoothText> */}
      </View>
      {/* <View>
        <SmoothText className="text-gray-500 text-sm">
          {format(new Date(item.modifiedAt), "d MMMM, yyyy")}
        </SmoothText>
      </View> */}
      <View className="flex-col gap-3 m-2">
        <View className="flex-row items-center justify-center" style={{}}>
          <SmoothText className="font-bold capitalize">{item.placeItem?.name}:</SmoothText>
          {/* <View className="flex-row gap-2">
            <RatingStars rating={review.taste} size={18} />
            <SmoothText className="font-bold">({review.taste})</SmoothText>
          </View> */}
        </View>
        <View className="flex-row gap-1">
          <View className="flex-col gap-1">
            <View className="flex-row items-center justify-between" style={{width: 150}}>
              <SmoothText>{TEXT_LABELS.TASTE}:</SmoothText>
              <View className="flex-row gap-2 items-center justify-center">
                {/* <RatingStars rating={item.placeItem?.ratingInfo?.taste ?? 0} size={18} /> */}
                {/* <View> */}
                  <SmoothText className="font-bold">{item.placeItem?.ratingInfo?.taste ?? '0'}</SmoothText><SmoothText>/5 ({item.placeItem?.ratingInfo?.noOfRatings})</SmoothText>
                {/* </View> */}
              </View>
            </View>
            <View className="flex-row items-center justify-between" style={{width: 150}}>
              <SmoothText>{TEXT_LABELS.PRESENTATION}:</SmoothText>
              <View className="flex-row gap-2 items-center justify-center">
                {/* <RatingStars rating={item.placeItem?.ratingInfo?.presentation ?? 0} size={18} /> */}
                <SmoothText className="font-bold">{item.placeItem?.ratingInfo?.presentation ?? 0}</SmoothText><SmoothText>/5 ({item.placeItem?.ratingInfo?.noOfRatings})</SmoothText>
              </View>
            </View>
          </View>
          <View className="w- justify-center items-center border-l border-gray-300">
            <SmoothText>{item.placeItem?.price ?? 'NA'}</SmoothText>
          </View>
        </View>
      </View>
      
      
      
    </View>
  );
}
