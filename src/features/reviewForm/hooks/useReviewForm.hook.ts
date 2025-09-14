import { doGetPlacesByName, doGetPlaceDetail } from '@/services/placesApi';
import { uploadMedia } from '@/services/mediasApi';
import { useReviewFormStore } from '@/state/useReviewFormStore';
import { Media, Place } from '@/types/Types';
import { useAuthStore } from '@/state';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { doSubmitReview } from '@/services/reviewsApi';
// import { Platform } from 'react-native';

export const useReviewForm = (user: any) => {
  console.log('useReviewForm.hook-> invoked with user: ', user);
  const {
    review,
    setDescription,
    setAmbience,
    setService,
    setTaste,
    setPresentation,
    setMedias,
    setCustomer,
    setPlace: setPlaceInStore,
    setItem,
    addChild,
    updateChild,
    removeChild,
    resetForm,
  } = useReviewFormStore();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // Do not get token here; get it dynamically in handleSubmit for latest value

  const getPlacesByName = async (query: string) => {
    try {
      const response = await doGetPlacesByName(query);
      console.log('Places fetched successfully:', response.data?.places?.length);
      return (
        response.data.places.map((place: any) => ({
          ...place,
          name: place.placeName,
        })) || []
      );
    } catch (error) {
      console.error('Error fetching places:', error);
      return [];
    }
  };

  // const handleImageUpload = (childUuid?: string, file?: any) => {
  //   // console.log('initiateImageUpload called');
  //   console.log('useReviewForm.hook->handleImageUpload(), user::   ', user);
  //   const customerId = user?.id;
  //   if (!customerId) {
  //     console.warn('No user logged in, cannot upload media');
  //     navigation.navigate('Login');
  //     return;
  //   }
  // };
  // const user = useAuthStore((state) => {
  //   console.log('useReviewForm.hook->handleImageUpload(), state in useAuthStore: ', state);
  //   return state.user;
  // });
  const handleImageUpload = async (childUuid?: string, file?: any): Promise<Media | null> => {
    // const reader = new FileReader();
    // reader.onload = (event) => {
    //   if (event.target?.result) {
    //     // updateFoodItem(id, 'image', event.target.result as string);
    //     console.log('Handle image upload for item, event.target?.result: ', event.target?.result);
    //   }
    // };
    // reader.readAsDataURL(file);
    console.log('useReviewForm.hook->handleImageUpload(), user::   ', user);
    const customerId = user?.id;
    if (!customerId) {
      console.warn('No user logged in, cannot upload media');
      // navigation.navigate('Login');
      // return null;
    }

    console.log('in ReviewForm->handleImageUpload, childUuid:', childUuid, 'file:', file);
    
    const newMedia = {} as Media;
    return await uploadMedia(customerId, file)
      .then((data) => {
        console.log('Media uploaded successfully, data:', data);
        if (data.at(0)) {
          newMedia.type = file.type || 'image/jpeg';
          newMedia.url = data.at(0).url;
          newMedia.key = data.at(0).key;
          newMedia.id = data.at(0).id;
          // const existingMedias = review?.children?.find(child => child.uuid === childUuid)?.medias || [];
          // setMedias({uuid: childUuid} as any, [...existingMedias, newMedia]);
        }
        return newMedia;
      })
      .catch((error) => {
        console.error('Error uploading media:', error);
        throw error;
      });

  };

  const handleSubmit = async () => {

    if(!review) {
      console.warn('No review to submit');
      return;
    }
    let reviewToSubmit = {
      ...review,
      place: review.place?._id,
      customerInfo: {id: user?.id},
    } as any;
    console.log('Submitted review details: ',reviewToSubmit );
    delete reviewToSubmit.uuid;
    reviewToSubmit?.children?.forEach((child: any) => {
      delete child.uuid;
    });

    const token = useAuthStore.getState().token;
    console.log('useReviewForm.hook->handleSubmit(), token::   ', token);
    if(!token) {
      console.warn('No auth token, cannot submit review');
      // navigation.navigate('Login');
      return;
    }
    await doSubmitReview(user?.id, token, reviewToSubmit).then((response) => {
      console.log('Review submitted successfully:', response.data);
      navigation.navigate('Home');
    }).catch((error) => {
      console.error('Error submitting review:', error);
      throw error;
    });
    resetForm();
  };

  const setPlace = (place: Place | null) => {
    if (!place) {
      resetForm();
    } else {
      // Implement place search logic here, possibly calling an API
      console.log('useReviewForm.hook -> setPlace: ', place._id);
      doGetPlaceDetail(place._id)
        .then((response) => {
          place = { ...place!, items: [...response.data.items] };
          setPlaceInStore(place!);
          // You can update the store with detailed place info if needed
        })
        .catch((error) => {
          console.error('Error fetching place details:', error);
        });
    }
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
    updateChild,
    handleImageUpload,
    handleSubmit,
  };
};
