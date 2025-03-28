import {
  User,
  UserPreferences,
  UserStatistics,
  LevelProgress
} from '@user/types/userTypes';
import {
  VocabularyCard,
  VocabularyCards
} from '@vocabularyCards/types/vocabTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userActions } from './userActions';
import { storageUtils } from '@/utils/storage';

export interface UserState {
  user: User | null;
  progress: LevelProgress[];
  preferences: UserPreferences;
  statistics: UserStatistics;
  vocabularyCards: VocabularyCards;
}

const initialState: UserState = {
  user: null,
  progress: [],
  preferences: {
    language: 'en'
  },
  statistics: {
    successRate: 0,
    totalAttempts: 0,
    correctAttempts: 0
  },
  vocabularyCards: []
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user: User | null) => userActions.setUser(user),
      markVocabCorrect: (vocabCard: VocabularyCard) =>
        userActions.markVocabCorrect(vocabCard),
      markVocabIncorrect: (vocabCard: VocabularyCard) =>
        userActions.markVocabIncorrect(vocabCard),
      updateStatistics: (statistics: Partial<UserStatistics>) =>
        userActions.updateStatistics(statistics),
      resetProgress: () => userActions.resetProgress(),
      setLanguage: (language: UserPreferences['language']) =>
        userActions.setLanguage(language),
      setVocabularyCards: (cards: VocabularyCard[]) =>
        userActions.setVocabularyCards(cards)
    }),
    {
      name: 'user-storage',
      storage: storageUtils,
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
        progress: state.progress,
        statistics: state.statistics
      })
    }
  )
);
