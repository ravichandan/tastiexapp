import React from 'react';
import { View } from 'react-native';
import Dropdown from '@/shared/components/Dropdown';
import { Cuisine, DietaryType } from '@/types/Types';

type Props = {
  cuisines: Cuisine[];
  dietaryOptions: DietaryType[];
  onSelectDietary: (dietary: DietaryType | null) => void;
  onSelectCuisine: (cuisine: Cuisine | null) => void;
};

export default function FilterAccordion({ cuisines, dietaryOptions, onSelectDietary, onSelectCuisine }: Props) {
  return (
    <View className="mt-4 space-y-4">
      <Dropdown label="Cuisine" options={cuisines} onSelect={onSelectCuisine} />
      <Dropdown label="Dietary" options={dietaryOptions.map(option => option.name)} onSelect={onSelectDietary} />
    </View>
  );
}
