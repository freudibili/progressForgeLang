import { VocabularyCard } from "@vocabularyCards/types";
import { User, UserPreferences, UserStatistics } from "../types";
import { useUserStore } from "./userStore";

type UserActions = {
  setUser: (user: User | null) => void;
  markVocabCorrect: (vocabCard: VocabularyCard) => void;
  updateStatistics: (statistics: Partial<UserStatistics>) => void;
  resetProgress: () => void;
  setLanguage: (language: UserPreferences["language"]) => void;
};

export const userActions: UserActions = {
  setUser: (user: User | null) => {
    useUserStore.setState({ user });
  },

  markVocabCorrect: (vocabCard) => {
    const { userVocab, statistics } = useUserStore.getState();
    const existingProgress = userVocab.find(
      (progress) => progress.cardId === vocabCard.id
    );

    if (existingProgress) {
      const updatedVocab = userVocab.map((progress) =>
        progress.cardId === vocabCard.id
          ? {
              ...progress,
              correctCount: progress.correctCount + 1,
              lastReviewedAt: new Date(),
            }
          : progress
      );
      useUserStore.setState({
        userVocab: updatedVocab,
        statistics: {
          ...statistics,
          totalCards: statistics.totalCards + 1,
          masteredCards: updatedVocab.filter((p) => p.correctCount >= 3).length,
          successRate: (statistics.masteredCards / statistics.totalCards) * 100,
        },
      });
    } else {
      useUserStore.setState({
        userVocab: [
          ...userVocab,
          {
            cardId: vocabCard.id,
            originalWord: vocabCard.infinitiv.de,
            correctCount: 1,
            lastReviewedAt: new Date(),
          },
        ],
      });
    }
  },

  updateStatistics: (statistics: Partial<UserStatistics>) => {
    const currentStats = useUserStore.getState().statistics;
    useUserStore.setState({
      statistics: { ...currentStats, ...statistics },
    });
  },

  resetProgress: () => {
    useUserStore.setState({
      userVocab: [],
      statistics: {
        totalCards: 0,
        masteredCards: 0,
        dailyStreak: 0,
        lastStudyDate: new Date().toISOString(),
        successRate: 0,
        studyTime: 0,
      },
    });
  },

  setLanguage: (language: UserPreferences["language"]) => {
    const { preferences } = useUserStore.getState();
    useUserStore.setState({
      preferences: { ...preferences, language },
    });
  },
};
