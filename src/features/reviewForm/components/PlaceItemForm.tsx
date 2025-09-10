import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import ImageUpload from './ImageUpload';
import { Item, NewReview, PlaceItem } from '@/types/Types';
import TxAutocomplete from '@/shared/components/TxAutoComplete';
import { RatingStars } from '@/shared/components/RatingStars';
import RatingSlider from '@/shared/components/RatingSlider';
import { useReviewForm } from '../hooks/useReviewForm.hook';

interface PlaceItemFormProps {
  review: NewReview;
  index: number;
  items: Item[];
  onRemove: (id: string) => void;
  onImageUpload: (id: string, file: any) => void;
  showRemoveButton: boolean;
}

const PlaceItemForm: React.FC<PlaceItemFormProps> = ({
  review,
  index,
  items,
  onRemove,
  onImageUpload,
  showRemoveButton,
}) => {
  const handleOnChange = (query: string) => {
    console.log('in PlaceItemForm->handleOnChange, Query:', query);
    // TODO: update Zustand state or navigate
  };
  const dummyDishes = [
    'Pizza',
    'Burger',
    'Sushi',
    'Pasta',
    'Tacos',
    'Vegetable Biryani',
    'Chicken Biryani',
    'Biryani',
    'Ramen',
    'Sandwich',
  ];

  const { setTaste, setPresentation, setMedias, setDescription } = useReviewForm();
  useEffect(() => {
    console.log('in PlaceItemForm, items.length prop:', items?.length);
  }, [items]);

  const handleItemSelect = (item: any) => {
    console.log('in ReviewForm->handleItemSelect, Selected item:', item._id);
    // setItem(item);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.itemTitle}>Item {index + 1}</Text>
        {showRemoveButton && (
          <TouchableOpacity onPress={() => onRemove(review.uuid!)}>
            {/* <Trash2 size={20} color="red" /> */}
            <Trash2 size={20} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.formBlock}>
        <Text style={styles.label}>Dish Name</Text>
        <TxAutocomplete data={items} onSelect={handleItemSelect} onQueryChange={(query:string) => handleOnChange(query)} />
      </View>

      <View style={styles.formBlock}>
        <Text style={styles.label}>How is its taste?</Text>
        {/* <RatingStars rating={1} /> */}
        <RatingSlider
          initial={2.5}
          max={5}
          step={0.5}
          onChange={(val: any) => setTaste(review, val)}
        />
      </View>

      <View style={styles.formBlock}>
        <Text style={styles.label}>And its Presentation?</Text>
        <RatingSlider
          initial={2.5}
          max={5}
          step={0.5}
          onChange={(val: any) => setPresentation(review, val)}
        />
      </View>

      {/* Uncomment and implement image upload if needed
      <View style={styles.formBlock}>
        <Text style={styles.label}>Add any image or video</Text>
        <ImageUpload
          image={review.medias?.at(0)}
          onImageUpload={(file) => onImageUpload(review.uuid!, file)}
        />
      </View>
      */}

      <View style={styles.formBlock}>
        <Text style={styles.label}>Anything else like quantity, spicy, etc</Text>
        <TextInput
          value={review.description}
          onChangeText={(text: string) => setDescription(review, text)}
          style={styles.textarea}
          placeholder="Add additional information"
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  formBlock: {
    marginBottom: 12,
  },
  label: {
    color: '#444',
    fontSize: 15,
    marginBottom: 4,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: '#222',
    minHeight: 60,
    textAlignVertical: 'top',
  },
});

export default PlaceItemForm;