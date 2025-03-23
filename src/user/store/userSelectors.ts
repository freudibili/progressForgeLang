import { VocabularyCard } from "@vocabularyCards/types";
import { useUserStore } from "./userStore";

const MASTERY_THRESHOLD = 3;
const MASTERY_MILESTONE = 5;

export const userSelectors = {
  useUser: () => useUserStore((state) => state.user),

  useCardProgress: (cardId: string) =>
    useUserStore(
      (state) =>
        state.userVocab.find((progress) => progress.cardId === cardId)
          ?.correctCount ?? 0
    ),

  useIsCardMastered: (cardId: string) =>
    useUserStore(
      (state) =>
        (state.userVocab.find((progress) => progress.cardId === cardId)
          ?.correctCount ?? 0) >= MASTERY_THRESHOLD
    ),

  useMasteredWordsCount: () =>
    useUserStore(
      (state) =>
        state.userVocab.filter(
          (progress) => progress.correctCount >= MASTERY_THRESHOLD
        ).length
    ),

  useWordsSeen: () =>
    useUserStore((state) =>
      state.userVocab.filter((progress) => progress.correctCount > 0)
    ),

  useMasteredWords: () =>
    useUserStore((state) =>
      state.userVocab.filter(
        (progress) => progress.correctCount >= MASTERY_THRESHOLD
      )
    ),

  usePreferences: () => useUserStore((state) => state.preferences),

  useSuccessRate: () => useUserStore((state) => state.statistics.successRate),

  // New computed selectors
  useCardStats: (cards: VocabularyCard[]) =>
    useUserStore((state) => {
      const masteredWords = state.userVocab.filter(
        (progress) => progress.correctCount >= MASTERY_THRESHOLD
      );
      const seenWords = state.userVocab.filter(
        (progress) => progress.correctCount > 0
      );

      return {
        masteredCount: cards.filter((card) =>
          masteredWords.some((progress) => progress.cardId === card.id)
        ).length,
        seenCount: seenWords.length,
      };
    }),

  useAreLevelCardsMastered: (cards: VocabularyCard[]) =>
    useUserStore((state) =>
      cards.every(
        (card) =>
          (state.userVocab.find((progress) => progress.cardId === card.id)
            ?.correctCount ?? 0) >= MASTERY_THRESHOLD
      )
    ),

  useMasteryMilestone: (cards: VocabularyCard[]) =>
    useUserStore((state) => {
      const masteredCount = cards.filter(
        (card) =>
          (state.userVocab.find((progress) => progress.cardId === card.id)
            ?.correctCount ?? 0) >= MASTERY_THRESHOLD
      ).length;

      const currentMilestone =
        Math.floor(masteredCount / MASTERY_MILESTONE) * MASTERY_MILESTONE;
      return {
        currentMilestone,
        masteredCount,
      };
    }),
};
