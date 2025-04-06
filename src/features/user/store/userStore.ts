import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { userActions } from './userActions';
import { User, UserPreferences, UserStatistics } from '../types/userTypes';

import { storageUtils } from '@/common/utils/storage';
import { Language } from '@/shared/types/sharedTypes';

export interface UserState {
  user: User | null;
  preferences: UserPreferences;
  statistics: UserStatistics;
}

const initialState: UserState = {
  user: null,
  preferences: {
    language: Language.English
  },
  statistics: {
    successRate: 0,
    totalAttempts: 0,
    correctAttempts: 0
  }
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user: User | null) => userActions.setUser(user),
      updateStatistics: (statistics: Partial<UserStatistics>) =>
        userActions.updateStatistics(statistics),
      setLanguage: (language: UserPreferences['language']) =>
        userActions.setLanguage(language)
    }),
    {
      name: 'user-storage',
      storage: storageUtils,
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
        statistics: state.statistics
      })
    }
  )
);
