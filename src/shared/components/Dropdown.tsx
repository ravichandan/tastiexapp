import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import SmoothText from './SmoothText';

type Props = {
  label: string;
  options: string[];
  onSelect: (item: any) => void;
};

export default function Dropdown({ label, options, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View className="border border-gray-300 rounded">
      <TouchableOpacity
        className="flex-row justify-between items-center px-3 py-2"
        onPress={() => setOpen((prev) => !prev)}
      >
        <SmoothText>{selected || `Select ${label}`}</SmoothText>
        <ChevronDown size={20} />
      </TouchableOpacity>

      {open && (
        // <FlatList
        //   data={options}
        //   nestedScrollEnabled
        //   keyExtractor={(item) => item}
        //   renderItem={({ item }) => (
        //     <TouchableOpacity
        //       className="px-3 py-2 bg-gray-100 border-t border-gray-200"
        //       onPress={() => {
        //         setSelected(item);
        //         setOpen(false);
        //       }}
        //     >
        //       <SmoothText>{item}</SmoothText>
        //     </TouchableOpacity>
        //   )}
        // />
        <View className="bg-white border-t border-gray-200">
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              className="px-3 py-2"
              onPress={() => {
                setSelected(item);
                onSelect(item);
                setOpen(false);
              }}
            >
              <SmoothText>{item}</SmoothText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
