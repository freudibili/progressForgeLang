import { UserVocabProgress } from '@user/types';
import type { VocabularyCard } from '../types';

export const getCardProgress = (
  card: VocabularyCard,
  practiceHistory: UserVocabProgress[]
): number => {
  return (
    practiceHistory.find((progress) => progress.cardId === card.id)
      ?.correctAttempts ?? 0
  );
};

const calculateCardWeight = (correctAttempts: number): number => {
  switch (correctAttempts) {
    case 0:
      return 1.0; // Highest priority for unseen cards
    case 1:
      return 0.8; // High priority for cards with one correct answer
    case 2:
      return 0.5; // Medium priority for cards with two correct answers
    default:
      return 0.1; // Low priority for well-practiced cards
  }
};

export const selectWeightedRandomCard = (
  availableCards: VocabularyCard[],
  practiceHistory: UserVocabProgress[],
  lastShownCardId: string | null = null
): VocabularyCard | null => {
  if (availableCards.length === 0) return null;

  const cardsForSelection = lastShownCardId
    ? availableCards.filter((card) => card.id !== lastShownCardId)
    : availableCards;

  if (cardsForSelection.length === 0) {
    return availableCards[0];
  }

  const cardWeights = cardsForSelection.map((card) => {
    const correctAttempts = getCardProgress(card, practiceHistory);
    return calculateCardWeight(correctAttempts);
  });

  const totalWeight = cardWeights.reduce((sum, weight) => sum + weight, 0);
  const randomValue = Math.random() * totalWeight;

  let accumulatedWeight = 0;
  for (let i = 0; i < cardsForSelection.length; i++) {
    accumulatedWeight += cardWeights[i];
    if (randomValue <= accumulatedWeight) {
      return cardsForSelection[i];
    }
  }

  return cardsForSelection[cardsForSelection.length - 1];
};
