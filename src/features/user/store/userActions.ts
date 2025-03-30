import { useUserStore } from './userStore';
import { User, UserPreferences, UserStatistics } from '../types/userTypes';
import { findLevelProgress, findCardProgress } from '../utils/progressUtils';

import { VocabularyCard } from '@/shared/types/sharedTypes';

type UserActions = {
  setUser: (user: User | null) => void;
  markVocabCorrect: (vocabCard: VocabularyCard) => void;
  markVocabIncorrect: (vocabCard: VocabularyCard) => void;
  updateStatistics: (statistics: Partial<UserStatistics>) => void;
  resetProgress: () => void;
  setLanguage: (language: UserPreferences['language']) => void;
  setVocabularyCards: (cards: VocabularyCard[]) => void;
};

export const userActions: UserActions = {
  setUser: (user: User | null) => {
    useUserStore.setState({ user });
  },

  markVocabCorrect: ({ id, levelId }) => {
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
                correctAttempts: 1,
                incorrectAttempts: 0
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
        correctAttempts: 1,
        incorrectAttempts: 0
      });
      useUserStore.setState({ progress: [...state.progress] });
      return;
    }

    // Update existing word
    word.correctAttempts++;
    useUserStore.setState({ progress: [...state.progress] });
  },

  markVocabIncorrect: ({ id, levelId }) => {
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
                correctAttempts: 0,
                incorrectAttempts: 1
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
        correctAttempts: 0,
        incorrectAttempts: 1
      });
      useUserStore.setState({ progress: [...state.progress] });
      return;
    }

    // Update existing word
    word.incorrectAttempts++;
    useUserStore.setState({ progress: [...state.progress] });
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
  }
};
