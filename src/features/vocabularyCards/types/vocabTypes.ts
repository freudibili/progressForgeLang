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
