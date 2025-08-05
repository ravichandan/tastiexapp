import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Image, View, ImageSourcePropType } from 'react-native';
// import { styled } from 'nativewind';
import { cssInterop } from "nativewind";
import googleIcon from '@/assets/icons/google_logo.png';
import facebookIcon from '@/assets/icons/facebook.png';


const StyledTouchable = cssInterop(TouchableOpacity, {
  className: 'style'
});
const StyledText = cssInterop(Text, {
  className: 'style'
});
const StyledImage = cssInterop(Image, {
  className: 'style'
});

type OAuthProvider = 'google' | 'facebook';

interface Props {
  provider: OAuthProvider;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  title?: string;
}

// Predefined styles per provider
const PROVIDER_STYLES: Record<
  OAuthProvider,
  { icon: ImageSourcePropType; bg: string; text: string; border: string }
> = {
  google: {
    icon: googleIcon,//'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png',//
    bg: 'bg-white',
    text: 'text-black',
    border: 'border-gray-400',
  },
  facebook: {
    icon: facebookIcon,
    bg: 'bg-white',
    text: 'text-black',
    border: 'border-gray-400',
  },
};

const OAuthButton = ({ provider, onPress, loading, disabled, title }: Props) => {
  const { icon, bg, text, border } = PROVIDER_STYLES[provider];

  return (
    <StyledTouchable
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center w-full py-3 px-4 rounded-full
        ${bg} ${text} ${border} border
        ${disabled || loading ? 'opacity-50' : 'active:opacity-80'}`}
    >
      <StyledImage source={icon} className="w-5 h-5 mr-3" resizeMode="contain" />
      {loading ? (
        <ActivityIndicator size="small" color={'#555'} />
      ) : (
        <StyledText className="text-base font-semibold">
          {title || `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
        </StyledText>
      )}
    </StyledTouchable>
  );
};

export default OAuthButton;
