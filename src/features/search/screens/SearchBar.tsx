import React from 'react';
import { View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { Search, Filter, X } from 'lucide-react-native';

type Props = {
  onToggleFilters: () => void;
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
  onClear: () => void;
};
export default function SearchBar({ onToggleFilters, value, onChange, onSearch, onClear }: Props) {
  return (
    <View className="flex-row items-center gap-2 bg-white">
      <TextInput
        placeholder="Search dishes or restaurants"
        className="flex-1 border border-gray-300 rounded px-3 py-2"
        value={value}
        onChangeText={(text) => {
          onChange(text);
          if (text.trim() === '') onClear(); // Live clearing
        }}
        onSubmitEditing={onSearch}
      />
      {/* {value.length > 0 && ( */}
        <Pressable onPress={onClear} disabled={value.length === 0} className="p-1">
          <X size={18} />
        </Pressable>
      {/* )} */}
      <TouchableOpacity onPress={onToggleFilters}>
        <Filter size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}
