
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Camera } from 'lucide-react-native';

interface ImageUploadProps {
  image: string | null;
  onImageUpload: (file: any) => void; // Use any for now, as File is not available in RN
}

const ImageUpload: React.FC<ImageUploadProps> = ({ image, onImageUpload }) => {
  // TODO: Integrate with react-native-image-picker or similar
  const handlePress = () => {
    // Placeholder: call onImageUpload with dummy value
    onImageUpload(null);
  };

  return (
    <TouchableOpacity style={styles.uploadBox} onPress={handlePress}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
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
    width: 128,
    height: 128,
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
    fontSize: 14,
    marginTop: 4,
  },
});

export default ImageUpload;