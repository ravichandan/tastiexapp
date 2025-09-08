import { doGetPlacesByName } from '@/services/placesApi';
import { useReviewFormStore } from '@/state/useReviewFormStore';

export const useReviewForm = () => {
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
  } = useReviewFormStore();

  const getPlacesByName = async (query: string) => {
    try {
      const response = await doGetPlacesByName(query);
      console.log('Places fetched successfully:', response.data);
      return response.data.places.map((place: any) => ({
       ...place,
        name: place.placeName
      })) || [];
    } catch (error) {
      console.error('Error fetching places:', error);
      return [];
    }
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // updateFoodItem(id, 'image', event.target.result as string);
        console.log('Handle image upload for item, event.target?.result: ', event.target?.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    // console.log({
    //   restaurantName,
    //   ambience,
    //   service,
    //   foodItems
    // });
    alert('Review submitted successfully!');
    resetForm();
  };

  const handlePlaceSearch = (query: string) => {
    // Implement place search logic here, possibly calling an API
    console.log('Searching for places with query:', query);
  };

  return {
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
    getPlacesByName,
    handleImageUpload,
    handleSubmit,
  };
};
