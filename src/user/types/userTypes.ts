export interface UserVocabProgress {
  cardId: string;
  correctAttempts: number;
  incorrectAttempts: number;
}

export interface LevelProgress {
  levelId: string;
  vocabProgress: UserVocabProgress[];
}

export interface UserPreferences {
  language: 'en' | 'fr';
}

export interface UserStatistics {
  successRate: number;
  totalAttempts: number;
  correctAttempts: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
