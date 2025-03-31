import { useUserStore } from './userStore';
import { User, UserPreferences, UserStatistics } from '../types/userTypes';
import { findLevelProgress, findCardProgress } from '../utils/progressUtils';

import { VocabularyCard } from '@/shared/types/sharedTypes';

type UserActions = {
  setUser: (user: User | null) => void;

  updateStatistics: (statistics: Partial<UserStatistics>) => void;
  resetProgress: () => void;
  setLanguage: (language: UserPreferences['language']) => void;
  setVocabularyCards: (cards: VocabularyCard[]) => void;
  markVocabAttempt: (params: {
    id: string;
    levelId: string;
    isCorrect: boolean;
  }) => void;
};

export const userActions: UserActions = {
  setUser: (user: User | null) => {
    useUserStore.setState({ user });
  },

  updateStatistics: (statistics: Partial<UserStatistics>) => {
    const currentStats = useUserStore.getState().statistics;
    useUserStore.setState({
      statistics: { ...currentStats, ...statistics }
    });
  },

  resetProgress: () => {
    useUserStore.setState({
      progress: [],
      statistics: {
        totalAttempts: 0,
        correctAttempts: 0,
        successRate: 0
      }
    });
  },

  setLanguage: (language: UserPreferences['language']) => {
    const { preferences } = useUserStore.getState();
    useUserStore.setState({
      preferences: { ...preferences, language }
    });
  },

  setVocabularyCards: (cards: VocabularyCard[]) => {
    useUserStore.setState({ vocabularyCards: cards });
  },

  markVocabAttempt: ({ id, levelId, isCorrect }) => {
    const state = useUserStore.getState();
    const level_progress = findLevelProgress(state.progress, levelId);

    if (!level_progress) {
      // Create new level with first word
      useUserStore.setState({
        progress: [
          ...state.progress,
          {
            levelId,
            vocabProgress: [
              {
                cardId: id,
                correctAttempts: isCorrect ? 1 : 0,
                incorrectAttempts: isCorrect ? 0 : 1
              }
            ]
          }
        ]
      });
      return;
    }

    const word = findCardProgress(level_progress, id);

    if (!word) {
      // Add new word to existing level
      level_progress.vocabProgress.push({
        cardId: id,
        correctAttempts: isCorrect ? 1 : 0,
        incorrectAttempts: isCorrect ? 0 : 1
      });
      useUserStore.setState({ progress: [...state.progress] });
      return;
    }

    // Update existing word
    if (isCorrect) word.correctAttempts++;
    if (!isCorrect) word.incorrectAttempts++;
    useUserStore.setState({ progress: [...state.progress] });
  }
};
