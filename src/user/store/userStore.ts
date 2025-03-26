import { UserState } from '@user/types/userTypes';
import { create } from 'zustand';

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
