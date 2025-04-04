import { useMemo } from 'react';

import { UserState, useUserStore } from './userStore';

import { levelSelectors } from '@/features/levels/store/levelSelectors';
import {
  MASTERY_MILESTONE,
  calculateSuccessRate,
  filterMasteredCards,
  findCardProgress,
  findLevelProgress,
  getCardAttempts,
  isCardMastered
} from '@/features/user/utils/progressUtils';
import { useVocabularyCardStore } from '@/features/vocabularyCards/store/vocabularyCardsStore';

export const userSelectors = {
  useLevels: () => {
    const { vocabularyCards } = useVocabularyCardStore();
    const availableLevels = levelSelectors.useLevels();

    return useMemo(
      () =>
        availableLevels
          .filter((level) =>
            vocabularyCards.some((card) => card.levelId === level.id)
          )
          .sort((a, b) => a.id.localeCompare(b.id)),
      [vocabularyCards, availableLevels]
    );
  },

  useCardProgress: (cardId: string, levelId: string) =>
    useUserStore((state: UserState) => {
      const levelProgress = findLevelProgress(state.progress, levelId);
      const progress = findCardProgress(levelProgress, cardId);
      return getCardAttempts(progress);
    }),

  useMasteredWordsCount: (levelId?: string) => {
    const progress = useUserStore((state: UserState) => state.progress);
    return useMemo(() => {
      if (!levelId) {
        return progress.reduce((total: number, levelProgress) => {
          const masteredCards = filterMasteredCards(
            levelProgress.vocabProgress.map((p) => p.cardId),
            levelProgress
          );
          return total + masteredCards.length;
        }, 0);
      }

      const levelProgress = findLevelProgress(progress, levelId);
      if (!levelProgress) return 0;

      return filterMasteredCards(
        levelProgress.vocabProgress.map((p) => p.cardId),
        levelProgress
      ).length;
    }, [progress, levelId]);
  },

  useTotalWordsCount: (levelId?: string) => {
    const { vocabularyCards } = useVocabularyCardStore();
    return useMemo(() => {
      if (!levelId) {
        return vocabularyCards.length;
      }

      return vocabularyCards.filter((card) => card.levelId === levelId).length;
    }, [vocabularyCards, levelId]);
  },

  useMasteredWords: (levelId?: string) => {
    const { vocabularyCards } = useVocabularyCardStore();
    const progress = useUserStore((state: UserState) => state.progress);

    return useMemo(() => {
      const masteredCardIds = (() => {
        if (!levelId) {
          return progress.flatMap((levelProgress) => {
            return filterMasteredCards(
              levelProgress.vocabProgress.map((p) => p.cardId),
              levelProgress
            );
          });
        }

        const levelProgress = findLevelProgress(progress, levelId);
        if (!levelProgress) return [];

        return filterMasteredCards(
          levelProgress.vocabProgress.map((p) => p.cardId),
          levelProgress
        );
      })();

      return vocabularyCards.filter((card) =>
        masteredCardIds.includes(card.id)
      );
    }, [vocabularyCards, progress, levelId]);
  },

  usePreferences: () => useUserStore((state: UserState) => state.preferences),

  useSuccessRate: (levelId?: string) => {
    const progress = useUserStore((state: UserState) => state.progress);
    return useMemo(() => {
      if (!levelId) {
        return (
          progress.reduce((total, levelProgress) => {
            return total + calculateSuccessRate(levelProgress);
          }, 0) / progress.length
        );
      }

      const levelProgress = findLevelProgress(progress, levelId);
      if (!levelProgress) return 0;

      return calculateSuccessRate(levelProgress);
    }, [progress, levelId]);
  },

  useCardStats: (levelId: string) => {
    const progress = useUserStore((state: UserState) => state.progress);
    return useMemo(() => {
      const levelProgress = findLevelProgress(progress, levelId);
      if (!levelProgress) {
        return {
          masteredCount: 0,
          seenCount: 0,
          totalCount: 0
        };
      }

      const cardIds = levelProgress.vocabProgress.map((p) => p.cardId);
      const masteredWords = filterMasteredCards(cardIds, levelProgress);

      return {
        masteredCount: masteredWords.length,
        seenCount: cardIds.length,
        totalCount: cardIds.length
      };
    }, [progress, levelId]);
  },

  useAreLevelCardsMastered: (levelId: string) => {
    const progress = useUserStore((state: UserState) => state.progress);
    return useMemo(() => {
      const levelProgress = findLevelProgress(progress, levelId);
      if (!levelProgress) return false;

      return levelProgress.vocabProgress.every((vocabProgress) => {
        return isCardMastered(getCardAttempts(vocabProgress));
      });
    }, [progress, levelId]);
  },

  useMasteryMilestone: (levelId: string) => {
    const progress = useUserStore((state: UserState) => state.progress);
    return useMemo(() => {
      const levelProgress = findLevelProgress(progress, levelId);
      if (!levelProgress) {
        return {
          currentMilestone: 0,
          masteredCount: 0
        };
      }

      const cardIds = levelProgress.vocabProgress.map((p) => p.cardId);
      const masteredCount = filterMasteredCards(cardIds, levelProgress).length;
      const currentMilestone =
        Math.floor(masteredCount / MASTERY_MILESTONE) * MASTERY_MILESTONE;

      return {
        currentMilestone,
        masteredCount
      };
    }, [progress, levelId]);
  }
};
