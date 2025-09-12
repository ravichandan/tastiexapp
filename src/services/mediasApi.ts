import { axiosInstance as axios } from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/shared/constants/constants';
import { Platform } from 'react-native';


export const uploadMedia = async (customerId: string, file: any) => {
  if (!file || !file.uri) {
        console.warn('No file selected');
        return;
      }
  
      const formData = new FormData();
      formData.append('files', {
        uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
        name: file.fileName || `upload_${Date.now()}`,
        type: file.type || (file.uri.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg'),
      } as any);
  
      try {
        // const response = await fetch('https://your-backend-api/upload', {
        const response = await axios.post(API_ENDPOINTS.MEDIAS_UPLOAD, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'CUSTOMER_ID': customerId,
            // Add auth headers if needed
          },
        });
        // });
        // const result = await response.json();
        console.log('Upload result:', response);
        return response.data;
        // Optionally update state with result
      } catch (err: any) {
        // console.error('Upload failed:', JSON.stringify(err));
        console.error('Upload failed:', JSON.stringify(err.response?.data));
        // console.error('Upload failed:', JSON.stringify(err.message));
        throw err.response?.data;
      }
};


// export const doGetDishDetail = async (placeId: string, dishId: string, filters?: any) => {
//   console.log('in itemApi.ts -> doGetDishDetail()');
//   const placeItemDetailEndpoint = API_ENDPOINTS.PLACE_ITEM_DETAIL.replace('{placeId}', placeId).replace('{itemId}', dishId);
//   return axios.get(placeItemDetailEndpoint, {
//     params: {
//       ...filters,      
//     },
//   }); //pageSize=12&pageNum=2
// };

// export const doGetDishDetailReviews = async (placeId: string, dishId: string, filters?: {pageNum?: number, pageSize?: number}) => {
//   const placeItemDetailReviewsEndpoint = API_ENDPOINTS.PLACE_ITEM_DETAIL_REVIEWS.replace('{placeId}', placeId).replace('{itemId}', dishId);
//   return axios.get(placeItemDetailReviewsEndpoint, {
//     params: {
//       ...filters,      
//     },
//   }); //pageSize=12&pageNum=2
// };

