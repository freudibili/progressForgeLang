import {
  useVocabularyCardStore,
  VocabularyCardState
} from './vocabularyCardsStore';
import { Level, VocabularyCard } from '@/shared/types/sharedTypes';

export const vocabularyCardSelectors = {
  useVocabularyCards: () =>
    useVocabularyCardStore(
      (state: VocabularyCardState) => state.vocabularyCards
    ),
  useIsLoading: () =>
    useVocabularyCardStore((state: VocabularyCardState) => state.isLoading),
  useError: () =>
    useVocabularyCardStore((state: VocabularyCardState) => state.error),

  useAvailableLevels: (allLevels: Level[]) => {
    const vocabularyCards = useVocabularyCardStore(
      (state: VocabularyCardState) => state.cards
    );
    return allLevels
      .filter(
        (level) =>
          vocabularyCards[level.id] && vocabularyCards[level.id].length > 0
      )
      .sort((a, b) => a.id.localeCompare(b.id));
  },

  useMasteredWords: (levelId: string) => {
    const store = useVocabularyCardStore();
    const levelCards = store.cards[levelId] || [];
    const levelProgress = store.progress.find((p) => p.levelId === levelId);

    if (!levelProgress) return [];

    const masteredCardIds = levelProgress.vocabProgress
      .filter(
        (p) =>
          p.correctAttempts >= 3 &&
          p.correctAttempts / (p.correctAttempts + p.incorrectAttempts) >= 0.8
      )
      .map((p) => p.cardId);

    return levelCards.filter((card) => masteredCardIds.includes(card.id));
  },

  useLevelProgress: (levelId: string, availableCards: VocabularyCard[]) => {
    const store = useVocabularyCardStore();
    const levelProgress = store.progress.find((p) => p.levelId === levelId);

    // Create progress entries for all cards, including unseen ones
    return availableCards.map((card) => {
      const progress = levelProgress?.vocabProgress.find(
        (p) => p.cardId === card.id
      );

      return {
        cardId: card.id,
        correctAttempts: progress?.correctAttempts ?? 0,
        incorrectAttempts: progress?.incorrectAttempts ?? 0,
        lastAttemptedAt: progress?.lastAttemptedAt ?? 0
      };
    });
  }
};
