import { Check } from '@tamagui/lucide-icons';
import React from 'react';
import { XStack, YStack } from 'tamagui';

import { VocabularyCard } from './VocabularyCard';
import type { VocabularyCard as VocabularyCardType } from '../types';

type CardDisplayProps = {
  currentCard: VocabularyCardType;
  currentIndex: number;
  totalCards: number;
  isRevealed: boolean;
  onCardPress: () => void;
};

export const CardDisplay = ({
  currentCard,
  currentIndex,
  totalCards,
  isRevealed,
  onCardPress
}: CardDisplayProps) => {
  const masteryIcons = Array(totalCards)
    .fill(0)
    .map((_, index) => (
      <Check
        key={index}
        size={16}
        color={index < currentIndex ? '$green10' : '$gray5'}
      />
    ));

  return (
    <YStack padding="$4" gap="$4" flex={1}>
      <XStack justifyContent="flex-end" paddingRight="$2">
        {masteryIcons}
      </XStack>
      <VocabularyCard
        card={currentCard}
        isRevealed={isRevealed}
        onPress={onCardPress}
      />
    </YStack>
  );
};
