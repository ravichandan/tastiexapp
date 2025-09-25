// components/SearchToolbar.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, StyleSheet } from 'react-native';
import { MapPin, Share2 } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '@/shared/theme';
import { useFiltersStore } from '@/state/useFiltersStore';
import LocationPickerModal from './LocationPickerModal';

interface Props {
  onShare: () => void;
}

export default function SearchToolbar({ onShare }: Props) {
  const { location, radius, setRadius } = useFiltersStore();
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showRadiusPicker, setShowRadiusPicker] = useState(false);

  return (
    <>
      <View className="flex-row items-center justify-between py-2 bg-white my-4">
        {/* Share */}
        {/* <TouchableOpacity onPress={onShare} className="flex-row items-center">
          <Share2 size={20} color={theme.colors.primaryDark} />
          <Text className="ml-1 text-primary font-medium">Share</Text>
        </TouchableOpacity> */}

        {/* Location selector */}
        <TouchableOpacity onPress={() => setShowLocationPicker(true)} className="flex-row items-center max-w-[50%]">
          <MapPin size={20} color={theme.colors.primaryDark} />
          <Text numberOfLines={1} className="ml-1 text-gray-800 font-medium">
            {location?.name || 'Select location'}
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
          <TouchableOpacity
            onPress={() => setShowRadiusPicker(true)}
            className="border border-gray-200 rounded-md px-3 py-2"
            style={{ minWidth: 90, alignItems: 'center', justifyContent: 'center' }}>
            <Text className="text-gray-800 font-medium">{radius} km</Text>
          </TouchableOpacity>
          <Text className="text-gray-600 px-2">kms</Text>
        </View>
      </View>

      {/* Location Picker Modal */}
      <LocationPickerModal visible={showLocationPicker} onClose={() => setShowLocationPicker(false)} />

      {/* Radius Picker Modal */}
      <Modal
        visible={showRadiusPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRadiusPicker(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pick a radius</Text>
            <Picker
              selectedValue={radius}
              onValueChange={(value) => {
                setRadius(value);
                setShowRadiusPicker(false);
              }}
              style={{ width: 200 }}>
              <Picker.Item label="10" value="10" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="40" value="40" />
              <Picker.Item label="50" value="50" />
            </Picker>
            <TouchableOpacity onPress={() => setShowRadiusPicker(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    width: 260,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
