// components/LocationPickerModal.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Modal, View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import {  reverseGeocode } from "@/services/googlePlacesApi";
import { useFiltersStore } from "@/state/useFiltersStore";
import { MapPin, Crosshair, X } from "lucide-react-native";
import { theme } from "@/shared/theme";
import { debounce } from "@/shared/utils/debounce";
import { useSearch } from "./hooks/useSearch";
import { SuburbType } from "@/types/Types";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function LocationPickerModal({ visible, onClose }: Props) {
  const { setLocation, setLocationName } = useFiltersStore();
  const { getSuburbName, fetchAutocomplete } = useSearch();
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<SuburbType[]>([]);
  const [loading, setLoading] = useState(false);

  const runAutocomplete = useMemo(
    () =>
      debounce(async (text: string) => {
        if (!text.trim()) {
          setPredictions([]);
          return;
        }
        setLoading(true);
        try {
          const results = await fetchAutocomplete(text);
          setPredictions(results);
        } finally {
          setLoading(false);
        }
      }, 250),
    []
  );

  useEffect(() => {
    runAutocomplete(query);
  }, [query, runAutocomplete]);

  const handlePickPrediction = async (p: SuburbType) => {
    setLoading(true);
    // try {
    //   const details = await fetchPlaceDetails(p.place_id);
    //   if (details) {
        setLocationName(p.name);
        onClose();
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleUseMyLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const label = (await reverseGeocode(pos.coords.latitude, pos.coords.longitude)) ?? "Current location";
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, label });
      getSuburbName();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white rounded-t-2xl p-4 max-h-[70%]">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-black">Select Location</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={22} color="#111" />
            </TouchableOpacity>
          </View>

          {/* Search box */}
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3">
            <MapPin size={18} color={theme.colors.textSecondary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search a place or address"
              placeholderTextColor="#888"
              className="flex-1 h-10 ml-2 text-black"
              autoFocus
            />
          </View>

          {/* Use my location */}
          <TouchableOpacity
            className="flex-row items-center mt-3 p-3 rounded-lg bg-gray-100"
            onPress={handleUseMyLocation}
          >
            <Crosshair size={18} color={theme.colors.textSecondary} />
            <Text className="ml-2 text-black">Use my current location</Text>
          </TouchableOpacity>

          {/* Results */}
          {loading ? (
            <ActivityIndicator style={{ marginTop: 12 }} />
          ) : (
            <FlatList
              data={predictions}
              keyExtractor={(i) => i.postcode}
              renderItem={({ item }) => (
                <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => handlePickPrediction(item)}>
                  <Text className="text-black capitalize">{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingTop: 8, paddingBottom: 12 }}
              ListEmptyComponent={
                query ? <Text className="text-gray-500 mt-3">No results</Text> : null
              }
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
