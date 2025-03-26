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
  levelId: string;
  type: 'regular' | 'irregular';
  example: {
    de: string;
    fr: string;
    en: string;
  };
}

export type VocabularyCards = VocabularyCard[];

export interface CardProgress {
  cardId: string;
  correctAttempts: number;
  incorrectAttempts: number;
  masteryLevel: number;
}

export interface CardFilters {
  mastered?: boolean;
  searchTerm?: string;
}
