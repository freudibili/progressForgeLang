import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

interface ListIconProps {
  size?: number;
  color?: string;
}

export const ListIcon = ({ size = 24, color = '#000' }: ListIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" />
      <Path d="M7 13H17V11H7V13ZM7 17H17V15H7V17ZM7 9H17V7H7V9Z" fill={color} />
    </Svg>
  );
};
