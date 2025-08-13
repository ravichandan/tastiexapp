import SmoothText from '@/shared/components/SmoothText';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
  onClick: () => void;
  style?: object; // Optional style prop for customization
};

export default function SearchButton({ onClick, style }: Props) {
  return (
    <TouchableOpacity className="mt-6 py-3 rounded items-center" onPress={onClick} style={style}>
      <SmoothText className="text-white font-semibold">Search</SmoothText>
    </TouchableOpacity>
  );
}
