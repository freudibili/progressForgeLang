import { VocabLevel } from '@levels/types/level';

export interface VocabularyCard {
  id: string;
  infinitiv: {
    de: string;
    fr: string;
    en: string;
  };
  conjugation: {
    präsens: string;
    präteritum: string;
    perfekt: string;
    plusquamperfekt: string;
    futurI: string;
  };
  level: VocabLevel;
  type: 'regular' | 'irregular';
  example: {
    de: string;
    fr: string;
    en: string;
  };
}

export type VocabularyCards = { level: VocabLevel; vocab: VocabularyCard[] }[];

export interface CardProgress {
  cardId: string;
  correctAttempts: number;
  incorrectAttempts: number;
  lastReviewDate: Date;
  masteryLevel: number;
}

export interface CardFilters {
  mastered?: boolean;
  searchTerm?: string;
}
