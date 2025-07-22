// shared/components/ui/Icon.tsx
import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import type { LucideProps } from 'lucide-react-native';
import type { ComponentType } from 'react';

type IconName = keyof typeof LucideIcons;

type IconProps = {
  name: IconName;
  color?: string;
  size?: number;
  className?: string; // if using nativewind
};

export default function TxIcon({
  name,
  color = 'black',
  size = 24,
  className,
}: IconProps) {
    const LucideIcon = LucideIcons[name] as ComponentType<LucideProps>;
    return <LucideIcon color={color} size={size} className={className} />;
}
