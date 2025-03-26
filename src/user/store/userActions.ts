import { VocabularyCard } from '@vocabularyCards/types/vocabTypes';
import { User, UserPreferences, UserStatistics } from '../types/userTypes';
import { useUserStore } from './userStore';
import { findLevelProgress, findCardProgress } from '../utils/progressUtils';

type UserActions = {
  setUser: (user: User | null) => void;
  markVocabCorrect: (vocabCard: VocabularyCard) => void;
  markVocabIncorrect: (vocabCard: VocabularyCard) => void;
  updateStatistics: (statistics: Partial<UserStatistics>) => void;
  resetProgress: () => void;
  setLanguage: (language: UserPreferences['language']) => void;
};

export const userActions: UserActions = {
  setUser: (user: User | null) => {
    useUserStore.setState({ user });
  },

  markVocabCorrect: ({ id, level }) => {
    const state = useUserStore.getState();
    const level_progress = findLevelProgress(state.progress, level);

    if (!level_progress) {
      // Create new level with first word
      useUserStore.setState({
        progress: [
          ...state.progress,
          {
            level,
            vocabProgress: [
              {
                cardId: id,
                correctAttempts: 1,
                incorrectAttempts: 0,
                lastReviewDate: new Date()
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
        incorrectAttempts: 0,
        lastReviewDate: new Date()
      });
      useUserStore.setState({ progress: [...state.progress] });
      return;
    }

    // Update existing word
    word.correctAttempts++;
    word.lastReviewDate = new Date();
    useUserStore.setState({ progress: [...state.progress] });
  },

  markVocabIncorrect: ({ id, level }) => {
    const state = useUserStore.getState();
    const level_progress = findLevelProgress(state.progress, level);

    if (!level_progress) {
      // Create new level with first word
      useUserStore.setState({
        progress: [
          ...state.progress,
          {
            level,
            vocabProgress: [
              {
                cardId: id,
                correctAttempts: 0,
                incorrectAttempts: 1,
                lastReviewDate: new Date()
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
        incorrectAttempts: 1,
        lastReviewDate: new Date()
      });
      useUserStore.setState({ progress: [...state.progress] });
      return;
    }

    // Update existing word
    word.incorrectAttempts++;
    word.lastReviewDate = new Date();
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
  }
};
