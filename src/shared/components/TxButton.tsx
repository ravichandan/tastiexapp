import React from 'react';
import { Pressable, Text } from 'react-native';
import { getSurfaceStyle } from '@/shared/utils/getSurfaceStyle';
import clsx from 'clsx';
import { getTextStyle } from '@/shared/utils/getTextStyle';
// import { Pressable } from 'react-native';

// const StyledPressable = styled(Pressable);

type ButtonVariant = 'primary' | 'dark' | 'light' | 'dark-outline' | 'light-outline' | 'ghost';

export type TxButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
};

export default function TxButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = true,
}: TxButtonProps) {
  const surfaceClass = getSurfaceStyle(variant === 'ghost' ? 'light' : variant);
  const outlineClass = variant.includes('outline') ? 'bg-transparent border border-gray-400 text-blackk' : '';
  const ghostClass = variant === 'ghost' ? 'bg-transparent text-blackk' : '';
    console.log('surfaceClass: ', surfaceClass);
    console.log('outlineClass: ', outlineClass);
    console.log('ghostClass: ', ghostClass);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={clsx(
        'px-6 py-3 rounded-2xl justify-center items-center transition-all duration-150',
        surfaceClass,
        outlineClass,
        ghostClass,
        fullWidth && 'w-full',
        disabled && 'opacity-50'
      )}
    >
      <Text className={clsx(getTextStyle('button'), 'text-white')}>{label}</Text>
    </Pressable>
  );
}
