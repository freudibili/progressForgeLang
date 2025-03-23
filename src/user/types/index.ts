import { VocabLevel } from '@levels/types/level';
import { VocabularyCard } from '@vocabularyCards/types';

export interface UserVocabProgress {
  cardId: string;
  correctAttempts: number;
  incorrectAttempts: number;
  lastReviewDate: Date;
}

export interface LevelProgress {
  level: VocabLevel;
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

export interface VocabularyCards {
  level: VocabLevel;
  vocab: VocabularyCard[];
}

export interface UserState {
  user: User | null;
  progress: LevelProgress[];
  preferences: UserPreferences;
  statistics: UserStatistics;
  vocabularyCards: VocabularyCards[];
}
