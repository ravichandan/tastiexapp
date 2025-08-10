import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
  onClick: () => void;
};

export default function SearchButton({ onClick }: Props) {
  return (
    <TouchableOpacity className="bg-black mt-6 py-3 rounded items-center" onPress={onClick}>
      <Text className="text-white font-semibold">Search</Text>
    </TouchableOpacity>
  );
}
