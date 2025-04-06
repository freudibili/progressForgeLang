import { Language } from '@/shared/types/sharedTypes';

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
