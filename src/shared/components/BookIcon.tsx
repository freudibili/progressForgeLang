import React from 'react';
import { Circle } from 'tamagui';
import { Book } from '@tamagui/lucide-icons';

interface BookProps {
  size?: number;
}

export const BookIcon = ({ size = 24 }: BookProps) => {
  // Calculate icon size as 60% of the circle size
  const iconSize = Math.round(size * 0.6);

  return (
    <Circle
      size={size}
      backgroundColor="$blue10"
      alignItems="center"
      justifyContent="center"
      animation="bouncy"
      enterStyle={{ scale: 0.5, opacity: 0 }}
      exitStyle={{ scale: 0.5, opacity: 0 }}
    >
      <Book size={iconSize} color="white" />
    </Circle>
  );
};
