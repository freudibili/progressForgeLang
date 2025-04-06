import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { vocabularyCardActions } from './vocabularyCardActions';

import { storageUtils } from '@/common/utils/storage';
import { Level, VocabularyCard } from '@/shared/types/sharedTypes';
import { VocabularyCardState } from '../types/vocabularyCardTypes';

// Selectors
export const vocabularyCardSelectors = {
  useAvailableLevels: (allLevels: Level[]) => {
    const vocabularyCards = useVocabularyCardStore((state) => state.cards);
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

export const useVocabularyCardStore = create<VocabularyCardState>()(
  persist(
    (set, get) => ({
      cards: {},
      progress: [],
      isLoading: false,
      error: null,

      loadCards: async (level: { id: string; url: string }) => {
        const state = get();

        // Check if cards are already loaded for this level
        if (state.cards[level.id]) {
          return;
        }

        set({ isLoading: true, error: null });
        await vocabularyCardActions.loadCards(level as Level);
      },

      markAttempt: (cardId: string, levelId: string, isCorrect: boolean) => {
        const state = get();
        const levelProgress = state.progress.find((p) => p.levelId === levelId);

        if (!levelProgress) {
          // Create new progress for this level
          set({
            progress: [
              ...state.progress,
              {
                levelId,
                vocabProgress: [
                  {
                    cardId,
                    correctAttempts: isCorrect ? 1 : 0,
                    incorrectAttempts: isCorrect ? 0 : 1,
                    lastAttemptedAt: Date.now()
                  }
                ]
              }
            ]
          });
          return;
        }

        // Update existing progress
        const cardProgress = levelProgress.vocabProgress.find(
          (p) => p.cardId === cardId
        );

        if (!cardProgress) {
          // Add new card progress
          set({
            progress: state.progress.map((p) =>
              p.levelId === levelId
                ? {
                    ...p,
                    vocabProgress: [
                      ...p.vocabProgress,
                      {
                        cardId,
                        correctAttempts: isCorrect ? 1 : 0,
                        incorrectAttempts: isCorrect ? 0 : 1,
                        lastAttemptedAt: Date.now()
                      }
                    ]
                  }
                : p
            )
          });
          return;
        }

        // Update existing card progress
        set({
          progress: state.progress.map((p) =>
            p.levelId === levelId
              ? {
                  ...p,
                  vocabProgress: p.vocabProgress.map((cp) =>
                    cp.cardId === cardId
                      ? {
                          ...cp,
                          correctAttempts: isCorrect
                            ? cp.correctAttempts + 1
                            : cp.correctAttempts,
                          incorrectAttempts: isCorrect
                            ? cp.incorrectAttempts
                            : cp.incorrectAttempts + 1,
                          lastAttemptedAt: Date.now()
                        }
                      : cp
                  )
                }
              : p
          )
        });
      },

      getCardStats: (levelId: string) => {
        const state = get();
        const levelProgress = state.progress.find((p) => p.levelId === levelId);
        const levelCards = state.cards[levelId] || [];

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
          (p) =>
            p.correctAttempts >= 3 &&
            p.correctAttempts / (p.correctAttempts + p.incorrectAttempts) >= 0.8
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
          successRate: totalAttempts > 0 ? correctAttempts / totalAttempts : 0
        };
      },

      isLevelCompleted: (levelId: string) => {
        const state = get();
        const levelProgress = state.progress.find((p) => p.levelId === levelId);
        const levelCards = state.cards[levelId] || [];

        if (!levelProgress || levelCards.length === 0) {
          return false;
        }

        // Check if all cards are mastered
        return levelProgress.vocabProgress.every(
          (p) =>
            p.correctAttempts >= 3 &&
            p.correctAttempts / (p.correctAttempts + p.incorrectAttempts) >= 0.8
        );
      },

      getCardProgress: (cardId: string, levelId: string) => {
        const state = get();
        const levelProgress = state.progress.find((p) => p.levelId === levelId);

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

      getMasteryMilestone: (levelId: string) => {
        const state = get();
        const levelProgress = state.progress.find((p) => p.levelId === levelId);

        if (!levelProgress) {
          return {
            currentMilestone: 0,
            masteredCount: 0
          };
        }

        const masteredWords = levelProgress.vocabProgress.filter(
          (p) =>
            p.correctAttempts >= 3 &&
            p.correctAttempts / (p.correctAttempts + p.incorrectAttempts) >= 0.8
        );

        const masteredCount = masteredWords.length;
        const MASTERY_MILESTONE = 5;
        const currentMilestone =
          Math.floor(masteredCount / MASTERY_MILESTONE) * MASTERY_MILESTONE;

        return {
          currentMilestone,
          masteredCount
        };
      },

      getTotalStats: () => {
        const state = get();
        let totalMasteredCount = 0;
        let totalSeenCount = 0;
        let totalWordsCount = 0;
        let totalCorrectAttempts = 0;
        let totalAttempts = 0;

        // Calculate totals across all levels
        Object.entries(state.cards).forEach(([levelId, cards]) => {
          const levelProgress = state.progress.find(
            (p) => p.levelId === levelId
          );
          totalWordsCount += cards.length;

          if (levelProgress) {
            const masteredWords = levelProgress.vocabProgress.filter(
              (p) =>
                p.correctAttempts >= 3 &&
                p.correctAttempts / (p.correctAttempts + p.incorrectAttempts) >=
                  0.8
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
          successRate:
            totalAttempts > 0 ? totalCorrectAttempts / totalAttempts : 0
        };
      }
    }),
    {
      name: 'vocabulary-cards-storage',
      storage: storageUtils,
      partialize: (state) => ({
        cards: state.cards,
        progress: state.progress
      })
    }
  )
);
