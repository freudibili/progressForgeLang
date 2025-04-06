import { VocabularyCard as SharedVocabularyCard } from '@/shared/types/sharedTypes';

export interface VocabularyCardProgress {
  cardId: string;
  correctAttempts: number;
  incorrectAttempts: number;
  lastAttemptedAt?: number;
}

export interface LevelProgress {
  levelId: string;
  vocabProgress: VocabularyCardProgress[];
}

export interface VocabularyCardState {
  cards: Record<string, SharedVocabularyCard[]>;
  progress: LevelProgress[];
  isLoading: boolean;
  error: string | null;

  // Methods
  loadCards: (level: { id: string; url: string }) => Promise<void>;
  markAttempt: (cardId: string, levelId: string, isCorrect: boolean) => void;
  getCardStats: (levelId: string) => VocabularyCardStats;
  getTotalStats: () => VocabularyCardStats;
  isLevelCompleted: (levelId: string) => boolean;
  getCardProgress: (cardId: string, levelId: string) => number;
  getMasteryMilestone: (levelId: string) => VocabularyCardMilestone;
}

export interface VocabularyCardAttempt {
  cardId: string;
  levelId: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface VocabularyCardStats {
  masteredCount: number;
  seenCount: number;
  totalCount: number;
  successRate: number;
}

export interface VocabularyCardMilestone {
  currentMilestone: number;
  masteredCount: number;
}
