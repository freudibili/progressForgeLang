export interface VocabularyCard {
  id: number;
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
  level: string;
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
