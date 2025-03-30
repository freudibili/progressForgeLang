import { UserVocabProgress } from '@/features/user/types/userTypes';
import { VocabularyCard } from '@/shared/types/sharedTypes';

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
      return 1;
    case 1:
      return 20;
    case 2:
      return 40;
    default:
      return 0.001;
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
