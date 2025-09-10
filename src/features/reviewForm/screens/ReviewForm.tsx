
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import PlaceItemFormOrig from '../components/PlaceItemForm';
import { useReviewForm } from '../hooks/useReviewForm.hook';
import SmoothText from '@/shared/components/SmoothText';
import TxButton from '@/shared/components/TxButton';
import TxAutocomplete from '@/shared/components/TxAutoComplete';
import RatingSlider from '@/shared/components/RatingSlider';

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
  const [selectedRestaurantName, setSelectedRestaurantName] = useState('');
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    console.log('In ReviewForm->useEffect(), restaurantName state changed:', restaurantName);
    if(!restaurantName) {
      setPlaces([]);
      handlePlaceSelect(null);
      resetForm();
      addChild();
      return;
    }
    const fetchPlaces = async () => {
      if (restaurantName?.length >= 2) {
        const result = await getPlacesByName(restaurantName);
        console.log('Places fetched in ReviewForm:', result?.length);
        if (isMounted) setPlaces(result || []);
      } else {
        setPlaces([]);
      }
    };
    fetchPlaces();
    return () => { isMounted = false; };
  }, [restaurantName]);

  
  useEffect(() => {
    console.log('In ReviewForm, places state updated, length:', review?.place?._id);
    setSelectedRestaurantName(review?.place?.placeName || '');
  }, [review?.place]);

  const handlePlaceSelect = (place: any) => {
    console.log('in ReviewForm->handlePlaceSelect, Selected place:', place?._id);
    setPlace(place);
    // doGetPlaceDetail
  }

  // Memoize PlaceItemForm to prevent unnecessary rerenders
  const PlaceItemForm = React.useMemo(() => React.memo(PlaceItemFormOrig), []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.headerBlock}>
          <SmoothText style={styles.title}>Welcome Chandan</SmoothText>
          <SmoothText style={styles.subtitle}>Share your dining experience with us</SmoothText>
        </View>

        <View style={styles.formBlock}>
          <SmoothText style={styles.label}>Where did you have food?{review?.place?._id}</SmoothText>
          <TxAutocomplete data={places} onSelect={handlePlaceSelect} selectedValue={selectedRestaurantName} onQueryChange={(query: string) => setRestaurantName(query)} />
        </View>

        <View style={styles.formBlock}>
          <SmoothText style={styles.label}>How was the Ambience there?</SmoothText>
          <RatingSlider
            initial={review?.ambience || 0}
            max={5}
            step={0.5}
            onChange={setAmbience}
          />
        </View>

        <View style={styles.formBlock}>
          <SmoothText style={styles.label}>And their Service?</SmoothText>
          <RatingSlider
            initial={review?.service || 0}
            max={5}
            step={0.5}
            onChange={setService}
          />
        </View>

        <View style={styles.itemsBlock}>
          <Text style={styles.sectionTitle}>What did you have there?</Text>
          {React.useMemo(() => (
            review?.children && review.children.map((child, index) => (
              <PlaceItemForm
                key={child.uuid}
                review={child}
                index={index}
                items={review.place?.items || []}
                onRemove={removeChild}
                onImageUpload={handleImageUpload}
                showRemoveButton={(review?.children?.length || 0) > 1}
              />
            ))
          ), [review?.children, review?.place?.items])}
          <TouchableOpacity style={styles.addButton} onPress={() => addChild()}>
            <Plus size={20} color="#2563eb" />
            <Text style={styles.addButtonText}>Add another item</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.submitBlock}>
          <TxButton label="Submit Review" variant="dark" onPress={handleSubmit} />

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