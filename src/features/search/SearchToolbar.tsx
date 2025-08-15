// components/SearchToolbar.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MapPin, Share2 } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import { theme } from "@/shared/theme";
import { useFiltersStore } from "@/state/useFiltersStore";
import LocationPickerModal from "./LocationPickerModal";

interface Props {
  onShare: () => void;
}

export default function SearchToolbar({ onShare }: Props) {
  const { location, radius, setRadius } = useFiltersStore();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <View className="flex-row items-center justify-between px-4 py-2 bg-white my-4">

        {/* Share */}
        {/* <TouchableOpacity onPress={onShare} className="flex-row items-center">
          <Share2 size={20} color={theme.colors.primaryDark} />
          <Text className="ml-1 text-primary font-medium">Share</Text>
        </TouchableOpacity> */}

        {/* Location selector */}
        <TouchableOpacity onPress={() => setShowPicker(true)} className="flex-row items-center max-w-[50%]">
          <MapPin size={20} color={theme.colors.primaryDark} />
          <Text
            numberOfLines={1}
            className="ml-1 text-gray-800 font-medium"
          >
            {location?.name || "Select location"}
          </Text>
        </TouchableOpacity>

        {/* Radius picker */}
            {/* <Text className="text-gray-600 px-2">Radius:{radius}</Text> */}
        {/* <View className="border border-gray-300 rounded-md overflow-hidden">
          <Picker  selectedValue={radius} style={{ height: 36, width: 110, color: black }} onValueChange={(v) => setRadius(v)}>
            <Picker.Item label="1 km" value="1" />
            <Picker.Item label="3 km" value="3" />
            <Picker.Item label="5 km" value="5" />
            <Picker.Item label="10 km" value="10" />
            <Picker.Item label="20 km" value="20" />
          </Picker>
        </View> */}
        <View className="flex-row items-center">
            <View className="border border-gray-200 rounded-md overflow-hidden">
              <Picker
                selectedValue={radius}
                mode="dialog"
                prompt="Pick a radius"
                onValueChange={(value) => setRadius(value)}
                style={{ width: 85 }}
              >
                <Picker.Item style={{alignItems: 'center', justifyContent: 'center'}} label="10" value="10" />
                <Picker.Item style={{alignItems: 'center', justifyContent: 'center'}} label="20" value="20" />
                <Picker.Item style={{alignItems: 'center', justifyContent: 'center'}} label="30" value="30" />
                <Picker.Item style={{alignItems: 'center', justifyContent: 'center'}} label="40" value="40" />
                <Picker.Item style={{alignItems: 'center', justifyContent: 'center'}} label="50" value="50" />
              </Picker>
            </View>
            <Text className="text-gray-600 px-2">kms</Text>
            </View>
      </View>

      <LocationPickerModal visible={showPicker} onClose={() => setShowPicker(false)} />
    </>
  );
}
