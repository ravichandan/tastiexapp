
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import PlaceItemFormOrig from '../components/PlaceItemForm';
import { useReviewForm } from '../hooks/useReviewForm.hook';
import SmoothText from '@/shared/components/SmoothText';
import TxButton from '@/shared/components/TxButton';
import TxAutocomplete from '@/shared/components/TxAutoComplete';
import RatingSlider from '@/shared/components/RatingSlider';
import { useAuthStore } from '@/state';
import { NewReview } from '@/types/Types';
import ImageUpload from '../components/ImageUpload';

const ReviewForm: React.FC = () => {
  const user = useAuthStore(state => state.user);

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
    updateChild,
    handleImageUpload,
    handleSubmit,
    getPlacesByName,
    // initiateImageUpload
  } = useReviewForm(user);

  useEffect(() => {
    resetForm();
    addChild();
  }, []);


  const [restaurantName, setRestaurantName] = useState('');
  const [selectedRestaurantName, setSelectedRestaurantName] = useState('');
  const [places, setPlaces] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>({});
  const validate = () => {
    if(!review) {
      return false;
    }
    const newErrors: { [key: string]: string | string[] } = {};
    if (review.description && review.description.length < 5) {
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
    // console.log('In ReviewForm, places state updated, length:', review?.place?._id);
    setSelectedRestaurantName(review?.place?.placeName || '');
  }, [review?.place]);

  const onSubmit = () => {
    console.log('In ReviewForm->onSubmit(), review to validate:', review);
    if (validate()) {
      // console.log('Validation successful, submitting review:', JSON.stringify(review));
      // handleSubmit();
    } else {
      console.log('Validation failed, errors:', errors);
    }
  }

  const handlePlaceSelect = (place: any) => {
    // console.log('in ReviewForm->handlePlaceSelect, Selected place:', place?._id);
    setPlace(place);
    // doGetPlaceDetail
  }

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

  // Memoize PlaceItemForm to prevent unnecessary rerenders
  // const PlaceItemForm = React.useMemo(() => React.memo(PlaceItemFormOrig), [user]);
  const PlaceItemForm = PlaceItemFormOrig;//), [user]);

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
          {/* <TxButton label="Check Login" variant="dark" onPress={() => initiateImageUpload()} /> */}
          {/* {React.useMemo(() => ( */}
            {review?.children && review.children.map((child, index) => (
              <PlaceItemForm
                key={child.uuid}
                review={child}
                index={index}
                items={review.place?.items || []}
                onRemove={removeChild}
                onImageUpload={handleImageUpload}
                showRemoveButton={(review?.children?.length || 0) > 1}
              />
            ))}
          {/* ), [review?.children, review?.place?.items, user])} */}
          <TouchableOpacity style={styles.addButton} onPress={() => addChild()}>
            <Plus size={20} color="#2563eb" />
            <Text style={styles.addButtonText}>Add another item</Text>
          </TouchableOpacity>
        </View>

        {review && (<View style={[styles.formBlock, { flexDirection: 'column' }]}>
          <SmoothText style={styles.label}>Have more image or videos of this place?</SmoothText>

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
        </View>)}

        <View style={styles.submitBlock}>
          <TxButton label="Submit Review" variant="dark" onPress={onSubmit} />
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
  error: {
    color: '#ef4444',
  },
});

export default ReviewForm;