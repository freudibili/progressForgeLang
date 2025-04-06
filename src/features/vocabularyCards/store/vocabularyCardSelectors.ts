import { useVocabularyCardStore } from './vocabularyCardsStore';
import {
  VocabularyCardState,
  VocabularyCardStats,
  VocabularyCardMilestone
} from '../types/vocabularyCardTypes';
import {
  Level,
  VocabularyCard,
  CardProgress
} from '@/shared/types/sharedTypes';

// Helper function to calculate success rate
const calculateSuccessRate = (
  correctAttempts: number,
  totalAttempts: number
): number => {
  // Ensure we have valid numbers
  const validCorrect = Number(correctAttempts) || 0;
  const validTotal = Number(totalAttempts) || 0;

  return validTotal === 0 ? 0 : validCorrect / validTotal;
};

export const vocabularyCardSelectors = {
  useVocabularyCards: () =>
    useVocabularyCardStore((state: VocabularyCardState) => state.cards),
  useIsLoading: () =>
    useVocabularyCardStore((state: VocabularyCardState) => state.isLoading),
  useError: () =>
    useVocabularyCardStore((state: VocabularyCardState) => state.error),

  useAvailableCards: (levelId: string | undefined) => {
    const vocabularyCards = useVocabularyCardStore(
      (state: VocabularyCardState) => state.cards
    );

    if (!levelId) return [];
    return vocabularyCards[levelId] || [];
  },

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
      .filter((p) => {
        const totalAttempts = p.correctAttempts + p.incorrectAttempts;
        const successRate = calculateSuccessRate(
          p.correctAttempts,
          totalAttempts
        );
        return p.correctAttempts >= 3 && successRate >= 0.8;
      })
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
        masteryLevel: progress?.masteryLevel ?? 0,
        lastAttemptedAt: progress?.lastAttemptedAt ?? 0
      };
    });
  },

  useAllCardsProgress: (
    levelId: string,
    availableCards: VocabularyCard[]
  ): CardProgress[] => {
    const store = useVocabularyCardStore();
    const levelProgress = store.progress.find((p) => p.levelId === levelId);

    // Create progress entries for all cards, including unseen ones
    return availableCards.map((card) => {
      const progress = levelProgress?.vocabProgress.find(
        (p) => p.cardId === card.id
      );

      return (
        progress || {
          cardId: card.id,
          correctAttempts: 0,
          incorrectAttempts: 0
        }
      );
    });
  },

  useCardStats: (levelId: string): VocabularyCardStats => {
    const store = useVocabularyCardStore();
    const levelProgress = store.progress.find((p) => p.levelId === levelId);
    const levelCards = store.cards[levelId] || [];

    if (!levelProgress) {
      return {
        masteredCount: 0,
        seenCount: 0,
        totalCount: levelCards.length,
        successRate: 0
      };
    }

    const cardIds = levelProgress.vocabProgress.map((p) => p.cardId);
    const masteredWords = levelProgress.vocabProgress.filter(
      (p) => p.masteryLevel === 2
    );

    const totalAttempts = levelProgress.vocabProgress.reduce(
      (sum, p) => sum + p.correctAttempts + p.incorrectAttempts,
      0
    );

    const correctAttempts = levelProgress.vocabProgress.reduce(
      (sum, p) => sum + p.correctAttempts,
      0
    );

    return {
      masteredCount: masteredWords.length,
      seenCount: cardIds.length,
      totalCount: levelCards.length,
      successRate: calculateSuccessRate(correctAttempts, totalAttempts)
    };
  },

  useIsLevelCompleted: (levelId: string): boolean => {
    const store = useVocabularyCardStore();
    const levelProgress = store.progress.find((p) => p.levelId === levelId);
    const levelCards = store.cards[levelId] || [];

    if (!levelProgress || levelCards.length === 0) {
      return false;
    }

    // Check if all cards are mastered
    return levelProgress.vocabProgress.every((p) => p.masteryLevel === 2);
  },

  useCardProgress: (cardId: string, levelId: string): number => {
    const store = useVocabularyCardStore();
    const levelProgress = store.progress.find((p) => p.levelId === levelId);

    if (!levelProgress) {
      return 0;
    }

    const cardProgress = levelProgress.vocabProgress.find(
      (p) => p.cardId === cardId
    );

    if (!cardProgress) {
      return 0;
    }

    return cardProgress.correctAttempts;
  },

  useMasteryMilestone: (levelId: string): VocabularyCardMilestone => {
    const store = useVocabularyCardStore();
    const levelProgress = store.progress.find((p) => p.levelId === levelId);

    if (!levelProgress) {
      return {
        currentMilestone: 0,
        masteredCount: 0
      };
    }

    const masteredWords = levelProgress.vocabProgress.filter(
      (p) => p.masteryLevel === 2
    );

    const masteredCount = masteredWords.length;
    const totalCards = store.cards[levelId]?.length || 0;
    const currentMilestone = Math.floor((masteredCount / totalCards) * 5);

    return {
      currentMilestone,
      masteredCount
    };
  },

  useTotalStats: (): VocabularyCardStats => {
    const store = useVocabularyCardStore();
    let totalMasteredCount = 0;
    let totalSeenCount = 0;
    let totalWordsCount = 0;
    let totalCorrectAttempts = 0;
    let totalAttempts = 0;

    // Calculate totals across all levels
    Object.entries(store.cards).forEach(([levelId, cards]) => {
      const levelProgress = store.progress.find((p) => p.levelId === levelId);
      totalWordsCount += cards.length;

      if (levelProgress) {
        const masteredWords = levelProgress.vocabProgress.filter(
          (p) => p.masteryLevel === 2
        );
        totalMasteredCount += masteredWords.length;
        totalSeenCount += levelProgress.vocabProgress.length;

        levelProgress.vocabProgress.forEach((p) => {
          totalCorrectAttempts += p.correctAttempts;
          totalAttempts += p.correctAttempts + p.incorrectAttempts;
        });
      }
    });

    return {
      masteredCount: totalMasteredCount,
      seenCount: totalSeenCount,
      totalCount: totalWordsCount,
      successRate: calculateSuccessRate(totalCorrectAttempts, totalAttempts)
    };
  }
};
