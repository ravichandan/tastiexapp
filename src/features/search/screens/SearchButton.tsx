import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function SearchButton() {
  return (
    <TouchableOpacity className="bg-black mt-6 py-3 rounded items-center">
      <Text className="text-white font-semibold">Search</Text>
    </TouchableOpacity>
  );
}
