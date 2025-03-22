import { UserVocabProgress } from "@user/types";
import type { VocabularyCard } from "../types";

export const MASTERY_THRESHOLD = 3;

export const getCardProgress = (
  card: VocabularyCard,
  userProgress: UserVocabProgress[]
): number => {
  return (
    userProgress.find((progress) => progress.cardId === card.id)
      ?.correctCount ?? 0
  );
};

export const isCardMastered = (
  card: VocabularyCard,
  userProgress: UserVocabProgress[]
): boolean => {
  const progress = getCardProgress(card, userProgress);

  return progress >= MASTERY_THRESHOLD;
};

export const areAllCardsMastered = (
  cards: VocabularyCard[],
  userProgress: UserVocabProgress[]
): boolean => {
  return cards.every((card) => isCardMastered(card, userProgress));
};

export const getMasteredCount = (
  cards: VocabularyCard[],
  userProgress: UserVocabProgress[]
): number => {
  return cards.filter((card) => isCardMastered(card, userProgress)).length;
};
