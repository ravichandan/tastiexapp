import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

export default function SearchBar({ onToggleFilters }: { onToggleFilters: () => void }) {
  return (
    <View className="flex-row items-center gap-2">
      <TextInput
        placeholder="Search dishes or restaurants"
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <TouchableOpacity onPress={onToggleFilters}>
        <Filter size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}
