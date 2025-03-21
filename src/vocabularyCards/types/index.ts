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
  type: "regular" | "irregular";
  example: {
    de: string;
    fr: string;
    en: string;
  };
  difficulty: "beginner" | "intermediate" | "advanced";
  lastReviewed?: Date;
  mastered: boolean;
}

export interface CardProgress {
  cardId: string;
  correctAttempts: number;
  incorrectAttempts: number;
  lastReviewDate: Date;
  masteryLevel: number;
}

export interface CardFilters {
  difficulty?: VocabularyCard["difficulty"];
  mastered?: boolean;
  searchTerm?: string;
}

export type VocabLevel = "A1" | "A2" | "B1" | "B2";
