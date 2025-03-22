import { UserVocabProgress } from "@user/types";
import type { VocabularyCard } from "../types";
import { getCardProgress } from "./progressUtils";

const getWeight = (correctAnswers: number): number => {
  switch (correctAnswers) {
    case 0:
      return 1.0;
    case 1:
      return 0.8;
    case 2:
      return 0.5;
    default:
      return 0.1;
  }
};

export const selectWeightedRandomCard = (
  cards: VocabularyCard[],
  userProgress: UserVocabProgress[],
  previousCardId: string | null = null
): VocabularyCard | null => {
  if (cards.length === 0) return null;

  // Filter out the previous card if specified
  const availableCards = previousCardId
    ? cards.filter((card) => card.id !== previousCardId)
    : cards;

  // If we only had one card and it was the previous one, allow it to be reused
  if (availableCards.length === 0) {
    return cards[0];
  }

  const weights = availableCards.map((card) => {
    const correctAnswers = getCardProgress(card, userProgress);
    return getWeight(correctAnswers);
  });

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const random = Math.random() * totalWeight;

  let sum = 0;
  for (let i = 0; i < availableCards.length; i++) {
    sum += weights[i];
    if (random <= sum) {
      return availableCards[i];
    }
  }

  return availableCards[availableCards.length - 1];
};
