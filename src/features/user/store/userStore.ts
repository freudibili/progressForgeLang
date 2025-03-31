import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { userActions } from './userActions';
import {
  User,
  UserPreferences,
  UserStatistics,
  LevelProgress
} from '../types/userTypes';

import { storageUtils } from '@/common/utils/storage';
import { Language, VocabularyCard } from '@/shared/types/sharedTypes';

export interface UserState {
  user: User | null;
  progress: LevelProgress[];
  preferences: UserPreferences;
  statistics: UserStatistics;
  vocabularyCards: VocabularyCard[];
}

const initialState: UserState = {
  user: null,
  progress: [],
  preferences: {
    language: Language.English
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
      markVocabAttempt: (params: {
        id: string;
        levelId: string;
        isCorrect: boolean;
      }) => userActions.markVocabAttempt(params),

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
