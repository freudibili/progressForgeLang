export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  lastLoginAt: string;
  preferences: UserPreferences;
  statistics: UserStatistics;
}

export interface UserPreferences {
  notifications: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  language: "french" | "german";
  theme: "light" | "dark" | "system";
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
