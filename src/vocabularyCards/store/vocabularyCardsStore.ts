import { create } from 'zustand';
import { VocabularyCards } from '../types/vocabTypes';

export interface VocabularyCardState {
  vocabularyCards: VocabularyCards;
  isLoading: boolean;
  error: string | null;
}

export const useVocabularyCardStore = create<VocabularyCardState>(() => ({
  vocabularyCards: [],
  isLoading: false,
  error: null
}));
