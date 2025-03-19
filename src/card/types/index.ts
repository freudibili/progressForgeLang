export interface VocabularyCard {
  id: string;
  french: string;
  german: string;
  example: string;
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
