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
import React from "react";

const PlaceItem = React.memo(_PlaceItem);
export default PlaceItem;

function _PlaceItem({item, onFeedback }: { item: Item, onFeedback: (params: {reviewId: string, action: string}) => void }) {
  const user = useAuthStore((state) => state.user);
  // console.log('item::: ', item);
  return ( item && 
    <View className=" my-2  flex-row border border-dashed border-gray-300 rounded-lg gap-2">

      {/* First customer pic and name */}
      <View className="flex-row items-center w-1/4">
        <Image
          source={{
            uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + item?.placeItem?.media?.key,
          }}
          className="size-28 rounded-md" 
        />
      </View>

      <View className="flex-col gap-3 my-2 w-3/4">
        <View className="flex-row items-center justify-center" style={{}}>
          <SmoothText className="font-bold capitalize">{item.placeItem?.name}:</SmoothText>
          {/* <View className="flex-row gap-2">
            <RatingStars rating={review.taste} size={18} />
            <SmoothText className="font-bold">({review.taste})</SmoothText>
          </View> */}
        </View>
        <View className="flex-row gap-1">
          <View className="flex-col gap-1 w-2/3 px-3">
            <View className="flex-row items-center justify-between" style={{}}>
              <SmoothText>{TEXT_LABELS.TASTE}:</SmoothText>
              <View className="flex-row gap-2 items-center justify-center">
                {/* <RatingStars rating={item.placeItem?.ratingInfo?.taste ?? 0} size={18} /> */}
                {/* <View> */}
                  <SmoothText><SmoothText className="font-bold">{item.placeItem?.ratingInfo?.taste ?? '0'}</SmoothText><SmoothText>/5 ({item.placeItem?.ratingInfo?.noOfRatings})</SmoothText></SmoothText>
                {/* </View> */}
              </View>
            </View>
            <View className="flex-row items-center justify-between" style={{}}>
              <SmoothText>{TEXT_LABELS.PRESENTATION}:</SmoothText>
              <View className="flex-row gap-2 items-center justify-center">
                {/* <RatingStars rating={item.placeItem?.ratingInfo?.presentation ?? 0} size={18} /> */}
                <SmoothText><SmoothText className="font-bold">{item.placeItem?.ratingInfo?.presentation ?? '0'}</SmoothText><SmoothText>/5 ({item.placeItem?.ratingInfo?.noOfRatings})</SmoothText></SmoothText>
              </View>
            </View>
          </View>
          <View className="w-1/3 flex-row justify-center items-center border-l border-gray-300 ">
              <SmoothText className="text-center"><SmoothText className="text-lg">{'$'}</SmoothText><SmoothText className="font-bold">{item.placeItem?.price ?? 'NA'}</SmoothText></SmoothText>
              {/* <SmoothText className="text-lg font-bold"><SmoothText className="text-xl">$</SmoothText>{item.placeItem?.price ?? 'NA'}</SmoothText> */}
            {/* </View> */}
          </View>
        </View>
      </View>
      
      
      
    </View>
  );
}
