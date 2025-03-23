import { create } from 'zustand';

import { UserState } from '@user/types';

export const useUserStore = create<UserState>((set) => ({
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
}));
