import React from 'react';
import { View } from 'react-native';
import Dropdown from '@/shared/components/Dropdown';
import { Cuisine, DietaryType } from '@/types/Types';

type Props = {
  cuisines: Cuisine[];
  dietaryOptions: DietaryType[];
};

export default function FilterAccordion({ cuisines, dietaryOptions }: Props) {
  return (
    <View className="mt-4 space-y-4">
      <Dropdown label="Cuisine" options={cuisines} />
      <Dropdown label="Dietary" options={dietaryOptions.map(option => option.name)} />
    </View>
  );
}
