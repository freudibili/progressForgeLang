import React from 'react';
import { XStack, Circle } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
import { TrophyIcon } from '@/shared/components/TrophyIcon';

interface MasteryIconsProps {
  currentIndex: number;
  totalCards: number;
}

export const MasteryIcons = ({
  currentIndex,
  totalCards
}: MasteryIconsProps) => {
  // Show trophy after 3 cards completed
  if (currentIndex >= 3) {
    return (
      <XStack justifyContent="flex-end" height={24} alignItems="center">
        <TrophyIcon size={24} />
      </XStack>
    );
  }

  // Progress indicators
  const icons = Array(totalCards)
    .fill(0)
    .map((_, index) => (
      <Circle
        key={index}
        size={20}
        backgroundColor={index < currentIndex ? 'black' : '$gray2'}
        alignItems="center"
        justifyContent="center"
        animation="bouncy"
        enterStyle={{ scale: 0.5, opacity: 0 }}
        exitStyle={{ scale: 0.5, opacity: 0 }}
      >
        <Check size={12} color={index < currentIndex ? 'white' : '$gray8'} />
      </Circle>
    ));

  return (
    <XStack
      justifyContent="flex-end"
      gap="$2"
      height={24}
      alignItems="center"
      animation="standard"
      marginBottom="$4"
    >
      {icons}
    </XStack>
  );
};
