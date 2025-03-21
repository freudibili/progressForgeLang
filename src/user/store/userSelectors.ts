import { useUserStore } from "./userStore";

export const userSelectors = {
  useUser: () => useUserStore((state) => state.user),

  useUserVocabProgress: (cardId: string) =>
    useUserStore((state) =>
      state.userVocab.find((progress) => progress.cardId === cardId)
    ),

  useMasteredWordsCount: () =>
    useUserStore(
      (state) =>
        state.userVocab.filter((progress) => progress.correctCount >= 3).length
    ),

  useMasteredWords: () =>
    useUserStore((state) =>
      state.userVocab.filter((progress) => progress.correctCount >= 3)
    ),

  usePreferences: () => useUserStore((state) => state.preferences),

  useStatistics: () => useUserStore((state) => state.statistics),

  useDailyStreak: () => useUserStore((state) => state.statistics.dailyStreak),

  useSuccessRate: () => useUserStore((state) => state.statistics.successRate),

  useStudyTime: () => useUserStore((state) => state.statistics.studyTime),
};
