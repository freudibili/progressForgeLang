import { create } from 'zustand';

import { vocabularyCardService } from '../services/vocabularyCardsService';
import { VocabLevel, VocabularyCard } from '../types';

interface VocabularyCardState {
  vocabularyCards: VocabularyCard[];
  isLoading: boolean;
  error: string | null;
  loadCards: (level: VocabLevel) => Promise<void>;
}

export const useVocabularyCardStore = create<VocabularyCardState>((set) => ({
  vocabularyCards: [],
  isLoading: false,
  error: null,
  loadCards: async (level: VocabLevel) => {
    set({ isLoading: true, error: null });

    const { data, error } =
      await vocabularyCardService.fetchCardsByLevel(level);
    set({ vocabularyCards: data, isLoading: false, error });
  }
}));
