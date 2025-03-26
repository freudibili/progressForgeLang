import { UserState } from '@user/types/userTypes';
import { useUserStore } from './userStore';
import { useVocabularyCardStore } from '@vocabularyCards/store/vocabularyCardsStore';
import {
  MASTERY_MILESTONE,
  calculateSuccessRate,
  filterMasteredCards,
  filterSeenCards,
  findCardProgress,
  findLevelProgress,
  getCardAttempts,
  isCardMastered
} from '@user/utils/progressUtils';
import { useMemo } from 'react';

export const userSelectors = {
  useUser: () => useUserStore((state: UserState) => state.user),

  useLevels: () => {
    const { vocabularyCards } = useVocabularyCardStore();
    return useMemo(
      () =>
        vocabularyCards
          .map((card) => card.levelId)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => a.localeCompare(b)),
      [vocabularyCards]
    );
  },

  useCardProgress: (cardId: string, levelId: string) =>
    useUserStore((state: UserState) => {
      const levelProgress = findLevelProgress(state.progress, levelId);
      const progress = findCardProgress(levelProgress, cardId);
      return getCardAttempts(progress);
    }),

  useIsCardMastered: (cardId: string, levelId: string) =>
    useUserStore((state: UserState) => {
      const levelProgress = findLevelProgress(state.progress, levelId);
      const progress = findCardProgress(levelProgress, cardId);
      return isCardMastered(getCardAttempts(progress));
    }),

  useMasteredWordsCount: (levelId?: string) =>
    useUserStore((state: UserState) => {
      if (!levelId) {
        return state.progress.reduce((total: number, levelProgress) => {
          const masteredCards = filterMasteredCards(
            levelProgress.vocabProgress.map((p) => p.cardId),
            levelProgress
          );
          return total + masteredCards.length;
        }, 0);
      }

      const levelProgress = findLevelProgress(state.progress, levelId);
      if (!levelProgress) return 0;

      return filterMasteredCards(
        levelProgress.vocabProgress.map((p) => p.cardId),
        levelProgress
      ).length;
    }),

  useWordsSeen: (levelId?: string) =>
    useUserStore((state: UserState) => {
      if (!levelId) {
        return state.progress.flatMap((levelProgress) => {
          return filterSeenCards(
            levelProgress.vocabProgress.map((p) => p.cardId),
            levelProgress
          );
        });
      }

      const levelProgress = findLevelProgress(state.progress, levelId);
      if (!levelProgress) return [];

      return filterSeenCards(
        levelProgress.vocabProgress.map((p) => p.cardId),
        levelProgress
      );
    }),

  useMasteredWords: (levelId?: string) => {
    const { vocabularyCards } = useVocabularyCardStore();
    return useUserStore((state: UserState) => {
      const masteredCardIds = (() => {
        if (!levelId) {
          return state.progress.flatMap((levelProgress) => {
            return filterMasteredCards(
              levelProgress.vocabProgress.map((p) => p.cardId),
              levelProgress
            );
          });
        }

        const levelProgress = findLevelProgress(state.progress, levelId);
        if (!levelProgress) return [];

        return filterMasteredCards(
          levelProgress.vocabProgress.map((p) => p.cardId),
          levelProgress
        );
      })();

      return vocabularyCards.filter((card) =>
        masteredCardIds.includes(card.id)
      );
    });
  },

  usePreferences: () => useUserStore((state: UserState) => state.preferences),

  useSuccessRate: (levelId?: string) =>
    useUserStore((state: UserState) => {
      if (!levelId) {
        return state.statistics.successRate;
      }

      const levelProgress = findLevelProgress(state.progress, levelId);
      if (!levelProgress) return 0;

      return calculateSuccessRate(levelProgress);
    }),

  useCardStats: (levelId: string) =>
    useUserStore((state: UserState) => {
      const levelProgress = findLevelProgress(state.progress, levelId);
      if (!levelProgress) {
        return {
          masteredCount: 0,
          seenCount: 0,
          totalCount: 0
        };
      }

      const cardIds = levelProgress.vocabProgress.map((p) => p.cardId);
      const masteredWords = filterMasteredCards(cardIds, levelProgress);
      const seenWords = filterSeenCards(cardIds, levelProgress);

      return {
        masteredCount: masteredWords.length,
        seenCount: seenWords.length,
        totalCount: cardIds.length
      };
    }),

  useAreLevelCardsMastered: (levelId: string) =>
    useUserStore((state: UserState) => {
      const levelProgress = findLevelProgress(state.progress, levelId);
      if (!levelProgress) return false;

      return levelProgress.vocabProgress.every((progress) => {
        return isCardMastered(getCardAttempts(progress));
      });
    }),

  useMasteryMilestone: (levelId: string) =>
    useUserStore((state: UserState) => {
      const levelProgress = findLevelProgress(state.progress, levelId);
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
    })
};
