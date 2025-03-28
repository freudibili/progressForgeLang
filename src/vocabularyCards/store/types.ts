import { VocabularyCards } from '../types/vocabTypes';

export interface VocabularyCardState {
  vocabularyCards: VocabularyCards;
  isLoading: boolean;
  error: string | null;
}
