import { VocabLevel } from '@levels/types/level';
import { UserState } from '@user/types';
import {
  MASTERY_MILESTONE,
  calculateSuccessRate,
  filterMasteredCards,
  filterSeenCards,
  findCardProgress,
  findLevelData,
  findLevelProgress,
  getCardAttempts,
  isCardMastered
} from '@user/utils/progressUtils';
import { useUserStore } from './userStore';

export const userSelectors = {
  useUser: () => useUserStore((state: UserState) => state.user),

  useCardProgress: (cardId: string, level: VocabLevel) =>
    useUserStore((state: UserState) => {
      const levelData = findLevelData(state.vocabularyCards, level);
      if (!levelData?.vocab.find((v) => v.id === cardId)) return 0;

      const levelProgress = findLevelProgress(state.progress, level);
      const progress = findCardProgress(levelProgress, cardId);
      return getCardAttempts(progress);
    }),

  useIsCardMastered: (cardId: string, level: VocabLevel) =>
    useUserStore((state: UserState) => {
      const levelData = findLevelData(state.vocabularyCards, level);
      if (!levelData?.vocab.find((v) => v.id === cardId)) return false;

      const levelProgress = findLevelProgress(state.progress, level);
      const progress = findCardProgress(levelProgress, cardId);
      return isCardMastered(getCardAttempts(progress));
    }),

  useMasteredWordsCount: (level?: VocabLevel) =>
    useUserStore((state: UserState) => {
      if (!level) {
        return state.vocabularyCards.reduce((total: number, levelData) => {
          const levelProgress = findLevelProgress(
            state.progress,
            levelData.level
          );
          if (!levelProgress) return total;

          const masteredCards = filterMasteredCards(
            levelData.vocab,
            levelProgress
          );
          return total + masteredCards.length;
        }, 0);
      }

      const levelData = findLevelData(state.vocabularyCards, level);
      if (!levelData) return 0;

      const levelProgress = findLevelProgress(state.progress, level);
      if (!levelProgress) return 0;

      return filterMasteredCards(levelData.vocab, levelProgress).length;
    }),

  useWordsSeen: (level?: VocabLevel) =>
    useUserStore((state: UserState) => {
      if (!level) {
        return state.vocabularyCards.flatMap((levelData) => {
          const levelProgress = findLevelProgress(
            state.progress,
            levelData.level
          );
          if (!levelProgress) return [];

          return filterSeenCards(levelData.vocab, levelProgress);
        });
      }

      const levelData = findLevelData(state.vocabularyCards, level);
      if (!levelData) return [];

      const levelProgress = findLevelProgress(state.progress, level);
      if (!levelProgress) return [];

      return filterSeenCards(levelData.vocab, levelProgress);
    }),

  useMasteredWords: (level?: VocabLevel) =>
    useUserStore((state: UserState) => {
      if (!level) {
        return state.vocabularyCards.flatMap((levelData) => {
          const levelProgress = findLevelProgress(
            state.progress,
            levelData.level
          );
          if (!levelProgress) return [];

          return filterMasteredCards(levelData.vocab, levelProgress);
        });
      }

      const levelData = findLevelData(state.vocabularyCards, level);
      if (!levelData) return [];

      const levelProgress = findLevelProgress(state.progress, level);
      if (!levelProgress) return [];

      return filterMasteredCards(levelData.vocab, levelProgress);
    }),

  usePreferences: () => useUserStore((state: UserState) => state.preferences),

  useSuccessRate: (level?: VocabLevel) =>
    useUserStore((state: UserState) => {
      if (!level) {
        return state.statistics.successRate;
      }

      const levelData = findLevelData(state.vocabularyCards, level);
      if (!levelData) return 0;

      const levelProgress = findLevelProgress(state.progress, level);
      if (!levelProgress) return 0;

      return calculateSuccessRate(levelProgress);
    }),

  useCardStats: (level: VocabLevel) =>
    useUserStore((state: UserState) => {
      const levelData = findLevelData(state.vocabularyCards, level);

      if (!levelData) {
        return {
          masteredCount: 0,
          seenCount: 0,
          totalCount: 0
        };
      }

      const levelProgress = findLevelProgress(state.progress, level);
      if (!levelProgress) {
        return {
          masteredCount: 0,
          seenCount: 0,
          totalCount: levelData.vocab.length
        };
      }

      const masteredWords = filterMasteredCards(levelData.vocab, levelProgress);
      const seenWords = filterSeenCards(levelData.vocab, levelProgress);

      return {
        masteredCount: masteredWords.length,
        seenCount: seenWords.length,
        totalCount: levelData.vocab.length
      };
    }),

  useAreLevelCardsMastered: (level: VocabLevel) =>
    useUserStore((state: UserState) => {
      const levelData = findLevelData(state.vocabularyCards, level);
      if (!levelData) return false;

      const levelProgress = findLevelProgress(state.progress, level);
      if (!levelProgress) return false;

      return levelData.vocab.every((card) => {
        const progress = findCardProgress(levelProgress, card.id);
        return isCardMastered(getCardAttempts(progress));
      });
    }),

  useMasteryMilestone: (level: VocabLevel) =>
    useUserStore((state: UserState) => {
      const levelData = findLevelData(state.vocabularyCards, level);
      if (!levelData) {
        return {
          currentMilestone: 0,
          masteredCount: 0
        };
      }

      const levelProgress = findLevelProgress(state.progress, level);
      if (!levelProgress) {
        return {
          currentMilestone: 0,
          masteredCount: 0
        };
      }

      const masteredCount = filterMasteredCards(
        levelData.vocab,
        levelProgress
      ).length;
      const currentMilestone =
        Math.floor(masteredCount / MASTERY_MILESTONE) * MASTERY_MILESTONE;

      return {
        currentMilestone,
        masteredCount
      };
    })
};
