import React from 'react';
import { Image, ImageProps } from 'react-native';

// Default fallback image (local asset)
const defaultFallback = require('@/assets/img_placeholder.png');

type TxImageProps = Omit<ImageProps, 'source'> & {
	uri?: string | null;
	fallback?: any; // require('...')
};

const TxImageComponent: React.FC<TxImageProps> = ({ uri, fallback, ...props }) => {
	const [imageError, setImageError] = React.useState(false);
	const resolvedFallback = fallback || defaultFallback;
	return (
		<Image
			source={imageError || !uri ? resolvedFallback : { uri }}
			onError={() => setImageError(true)}
      className='border border-gray-300'
			{...props}
		/>
	);
};

export const TxImage = React.memo(TxImageComponent);
export default TxImage;
