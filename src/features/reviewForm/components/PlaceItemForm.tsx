import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import ImageUpload from './ImageUpload';
import { Item, NewReview, PlaceItem } from '@/types/Types';
import TxAutocomplete from '@/shared/components/TxAutoComplete';
import { RatingStars } from '@/shared/components/RatingStars';
import RatingSlider from '@/shared/components/RatingSlider';
import { useReviewForm } from '../hooks/useReviewForm.hook';
import { useAuthStore } from '@/state';
import SmoothText from '@/shared/components/SmoothText';

interface PlaceItemFormProps {
  review: NewReview;
  index: number;
  items: Item[];
  onRemove: (id: string) => void;
  onImageUpload: (uuid: string, file: any) => void;
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

  const user = useAuthStore((state) => state.user);
  const { setTaste, setPresentation, setMedias, setDescription } = useReviewForm(user);
  const { handleImageUpload, updateChild } = useReviewForm(user);

  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});
  const validate = () => {
    const newErrors: { [key: string]: string | string[] } = {};
    if (!review.description || review.description.length < 5) {
      newErrors.description = 'Description must be at least 5 characters.';
    }
    if (review.taste === undefined) {
      newErrors.taste = 'Please provide a taste rating.';
    }
    if (review.presentation === undefined) {
      newErrors.presentation = 'Please provide a presentation rating.';
    }
    // if(review.medias || review.medias.length === 0) {
    //   newErrors.medias = "Please upload at least one image or video.";
    // }
    // Add more business logic checks here...
    setErrors({ ...newErrors, medias: errors.medias });
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    console.log('in PlaceItemForm rendered');
  }, []);
  useEffect(() => {
    console.log('in PlaceItemForm rendered, review.medias', JSON.stringify(review.medias));
  }, [review.medias]);
  // const item: any =]
  const handleItemSelect = (item: any) => {
    console.log('in ReviewForm->handleItemSelect, Selected item:', item._id);
    // setItem(item);
  };

  const onHandleImageUpload = async (review: NewReview, file: any) => {
    console.log('in PlaceItemForm->onHandleImageUpload, childUuid:', review.uuid, 'file:', file);

    // setMedias(childUuid, [file]);
    try {
      const response = await handleImageUpload(review.uuid, file);
      console.log('in PlaceItemForm -> onHandleImageUpload, response:', response);
      console.log('in PlaceItemForm -> onHandleImageUpload, before, review.medias:', JSON.stringify(review.medias));
      if (response) {
        review.medias = review.medias ? [...review.medias, response] : [response];
      }
      console.log('in PlaceItemForm -> onHandleImageUpload, after, review.medias:', JSON.stringify(review.medias));
      updateChild(review.uuid!, review);
    } catch (error: any) {

      console.error('Image upload failed:', error);
      console.error('Image upload failed:', JSON.stringify(error));
      if (!errors.medias) {
        errors.medias = [];
      }
      errors.medias =
        Array.from(
          { length: (review.medias?.length ?? 0) + 1 },
          (_, index) =>
            'Error: ' + (index < errors.medias.length ? errors.medias[index] : error.message || 'Upload failed'),
        ) ?? [];
      setErrors({ ...errors, medias: errors.medias });
    }
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
        {React.useMemo(() => (
          <TxAutocomplete
            data={items}
            onSelect={handleItemSelect}
            onQueryChange={(query: string) => handleOnChange(query)}
          />
        ), [items])}
      </View>

      <View style={styles.formBlock}>
        <Text style={styles.label}>How is its taste?</Text>
        {/* <RatingStars rating={1} /> */}
        <RatingSlider initial={2.5} max={5} step={0.5} onChange={(val: any) => setTaste(review, val)} />
      </View>

      <View style={styles.formBlock}>
        <Text style={styles.label}>And its Presentation?</Text>
        <RatingSlider initial={2.5} max={5} step={0.5} onChange={(val: any) => setPresentation(review, val)} />
      </View>

      <View style={[styles.formBlock, { flexDirection: 'column' }]}>
        <SmoothText style={styles.label}>Add any image or video of this item</SmoothText>

        <View style={{ flexDirection: 'row' }}>
          <View className='mr-2'>
            <ImageUpload
              imageKey={review.medias?.at(0)?.key ?? null}
              onImageUpload={(file) => onHandleImageUpload(review, file)}
            />
          </View>
          {(review.medias?.length ?? 0) > 0 && <View className='mr-2'>
            <ImageUpload
              imageKey={review.medias?.at(1)?.key ?? null}
              onImageUpload={(file) => onHandleImageUpload(review, file)}
            />
          </View>}
          {(review.medias?.length ?? 0) > 1 && <View className='mr-2'>
            <ImageUpload
              imageKey={review.medias?.at(2)?.key ?? null}
              onImageUpload={(file) => onHandleImageUpload(review, file)}
            />
          </View>}
        </View>
        <View style={{}}>
          <SmoothText style={styles.error}>
            {errors.medias?.at(0) ?? errors.medias?.at(1) ?? errors.medias?.at(2)}
          </SmoothText>
        </View>
      </View>
      {/* {review.medias && review.medias.length > 0 && ( */}

      {/* )} */}
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
  error: {
    color: '#ef4444',
  },
});

export default PlaceItemForm;
