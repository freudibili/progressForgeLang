import { Language } from '@/shared/types/sharedTypes';

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
  language: Language;
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
