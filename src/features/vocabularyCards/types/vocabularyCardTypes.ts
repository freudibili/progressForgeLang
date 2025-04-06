import {
  VocabularyCard as SharedVocabularyCard,
  CardProgress
} from '@/shared/types/sharedTypes';

export interface VocabularyCardProgress extends CardProgress {
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
