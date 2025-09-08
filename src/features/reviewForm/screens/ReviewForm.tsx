
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { RatingStars } from '@/shared/components/RatingStars';
import PlaceItemForm from '../components/PlaceItemForm';
import { useReviewForm } from '../hooks/useReviewForm.hook';
import SmoothText from '@/shared/components/SmoothText';
import TxButton from '@/shared/components/TxButton';
import TxAutocomplete from '@/shared/components/TxAutoComplete';
import { add } from 'date-fns';

const ReviewForm: React.FC = () => {
  const {
    review,
    setDescription,
    setAmbience,
    setService,
    setTaste,
    setPresentation,
    setMedias,
    setCustomer,
    setPlace,
    setItem,
    addChild,
    removeChild,
    resetForm,
    handleImageUpload,
    handleSubmit,
    getPlacesByName,
  } = useReviewForm();

  useEffect(() => {
    resetForm();
    addChild();
  }, []);


  const [restaurantName, setRestaurantName] = useState('');
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchPlaces = async () => {
      if (restaurantName) {
        const result = await getPlacesByName(restaurantName);
        console.log('Places fetched in ReviewForm:', result);
        if (isMounted) setPlaces(result || []);
      } else {
        setPlaces([]);
      }
    };
    fetchPlaces();
    return () => { isMounted = false; };
  }, [restaurantName]);

  const handlePlaceSelect = (place: any) => {
    console.log('in ReviewForm->handlePlaceSelect, Selected place:', place);
    setPlace(place);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.headerBlock}>
          <SmoothText style={styles.title}>Welcome Chandan</SmoothText>
          <SmoothText style={styles.subtitle}>Share your dining experience with us</SmoothText>
        </View>

        <View style={styles.formBlock}>
          <SmoothText style={styles.label}>Where did you have food?</SmoothText>

          <TxAutocomplete data={places} onSelect={handlePlaceSelect} onQueryChange={(query) => setRestaurantName(query)} />
          {/* <TxAutocomplete data={places} onSelect={handlePlaceSelect} onQueryChange={(query) => console.log('in onqueryChange', query)} /> */}

          {/* <TextInput
            value={restaurantName}
            onChangeText={setRestaurantName}
            style={styles.input}
            placeholder="Enter restaurant name"
            placeholderTextColor="#888"
          /> */}
        </View>

        <View style={styles.formBlock}>
          <SmoothText style={styles.label}>How was the Ambience there?</SmoothText>
          <RatingStars rating={review?.ambience || 0} /* onChange={setAmbience} */ />
        </View>

        <View style={styles.formBlock}>
          <SmoothText style={styles.label}>And their Service?</SmoothText>
          <RatingStars rating={review?.service || 0} /* onChange={setService} */ />
        </View>

        <View style={styles.itemsBlock}>
          <Text style={styles.sectionTitle}>What did you have there?</Text>
          {review?.children && review.children.map((child, index) => (
            <PlaceItemForm
              key={child.uuid}
              review={child}
              index={index}
              items={review.place?.placeItems || []}
              // onUpdate={updateFoodItem}
              onRemove={removeChild}
              onImageUpload={handleImageUpload}
              showRemoveButton={(review?.children?.length || 0) > 1}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={() => addChild()}>
            <Plus size={20} color="#2563eb" />
            <Text style={styles.addButtonText}>Add another item</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.submitBlock}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
          <TxButton label={'SubmitReview'} onPress={handleSubmit} /> 
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 24,
    minHeight: '100%',
  },
  innerContainer: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  headerBlock: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },
  subtitle: {
    color: '#666',
    marginTop: 8,
    fontSize: 16,
  },
  formBlock: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  itemsBlock: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#2563eb',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  submitBlock: {
    paddingTop: 16,
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewForm;