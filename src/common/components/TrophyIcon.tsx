import React from 'react';
import { Circle } from 'tamagui';
import { Trophy } from '@tamagui/lucide-icons';

interface TrophyProps {
  size?: number;
}

export const TrophyIcon = ({ size = 24 }: TrophyProps) => {
  // Calculate icon size as 60% of the circle size
  const iconSize = Math.round(size * 0.6);

  return (
    <Circle
      size={size}
      backgroundColor="$yellow10"
      alignItems="center"
      justifyContent="center"
      animation="bouncy"
      enterStyle={{ scale: 0.5, opacity: 0 }}
      exitStyle={{ scale: 0.5, opacity: 0 }}
    >
      <Trophy size={iconSize} color="$yellow3" />
    </Circle>
  );
};
