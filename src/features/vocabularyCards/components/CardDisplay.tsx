import React from 'react';
import { YStack } from 'tamagui';

import { MasteryIcons } from './MasteryIcons';
import { VocabularyPlayingCard } from './VocabularyCard';
import { VocabularyCard } from '@/shared/types/sharedTypes';

interface CardDisplayProps {
  currentCard: VocabularyCard;
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
      <VocabularyPlayingCard
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
