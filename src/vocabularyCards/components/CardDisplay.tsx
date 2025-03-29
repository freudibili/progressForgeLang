import React from 'react';
import { YStack } from 'tamagui';

import { VocabularyCard } from './VocabularyCard';
import { VocabularyCard as VocabularyCardType } from '../types/vocabTypes';
import { MasteryIcons } from './MasteryIcons';

interface CardDisplayProps {
  currentCard: VocabularyCardType;
  currentIndex: number;
  totalCards: number;
  isRevealed: boolean;
  onCardPress: () => void;
}

export const CardDisplay = ({
  currentCard,
  currentIndex,
  totalCards,
  isRevealed,
  onCardPress
}: CardDisplayProps) => {
  return (
    <YStack padding="$4" gap="$4" flex={1}>
      <VocabularyCard
        card={currentCard}
        isRevealed={isRevealed}
        onPress={onCardPress}
        iconHeader={
          <MasteryIcons currentIndex={currentIndex} totalCards={totalCards} />
        }
      />
    </YStack>
  );
};
