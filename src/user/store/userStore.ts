import { create } from 'zustand';
import {
  User,
  UserPreferences,
  UserStatistics,
  UserVocabProgress
} from '../types';

interface UserState {
  user: User | null;
  userVocab: UserVocabProgress[];
  preferences: UserPreferences;
  statistics: UserStatistics;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  userVocab: [],
  preferences: {
    notifications: true,
    dailyReminder: true,
    reminderTime: '09:00',
    language: 'french',
    theme: 'system'
  },
  statistics: {
    totalCards: 0,
    masteredCards: 0,
    dailyStreak: 0,
    lastStudyDate: new Date().toISOString(),
    successRate: 0,
    studyTime: 0
  },
  isLoading: false,
  error: null
};

export const useUserStore = create<UserState>(() => initialState);
