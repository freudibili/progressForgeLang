export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserPreferences {
  notifications: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  language: 'french' | 'german';
  theme: 'light' | 'dark' | 'system';
}

export interface UserStatistics {
  totalCards: number;
  masteredCards: number;
  dailyStreak: number;
  lastStudyDate: string;
  successRate: number;
  studyTime: number;
}

export interface UserVocabProgress {
  cardId: string;
  originalWord: string;
  correctCount: number;
  lastReviewedAt: Date;
}
