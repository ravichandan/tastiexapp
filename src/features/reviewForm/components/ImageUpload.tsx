

import React, { use } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Alert } from 'react-native';
import { Camera } from 'lucide-react-native';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import Constants from 'expo-constants';

// import { useAuthStore } from '@/state';

interface ImageUploadProps {
  imageKey: string | null;
  onImageUpload: (file: any) => void; // Use any for now, as File is not available in RN
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageKey, onImageUpload }) => {

  // const {user} = useAuthStore();
  // const {handleImageUpload: initiateImageUpload} = useReviewForm(user);
  const handlePress = () => {
    Alert.alert(
      'Take a picture or video',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => {
            // console.log('Before Launching camera... initiateImageUpload()');
            // initiateImageUpload();
            launchCamera({ mediaType: 'photo', quality: 0.7 }, (response: any) => {
              // console.log('Camera response: ', response.assets.length);

            // console.log('After Fetching camera response... initiateImageUpload()');
            // initiateImageUpload();
              if (response.assets && response.assets.length > 0) {
                onImageUpload(response.assets[0]);
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response: any) => {
              if (response.assets && response.assets.length > 0) {
                onImageUpload(response.assets[0]);
              }
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.uploadBox} onPress={handlePress}>
      {imageKey ? (
        <Image source={{
            uri: Constants.expoConfig?.extra?.bucketAccessEndpoint + '/' + imageKey,
          }}
          style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Camera size={24} color="#888" />
          <Text style={styles.placeholderText}>Add img/video</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  uploadBox: {
    width: 96,
    height: 96,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
});

// export default ImageUpload;
export default React.memo(ImageUpload);