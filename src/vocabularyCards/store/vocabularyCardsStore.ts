import { create } from 'zustand';

import { vocabularyCardService } from '../services/vocabularyCardsService';
import { VocabularyCards } from '../types/vocabTypes';

interface VocabularyCardState {
  vocabularyCards: VocabularyCards;
  isLoading: boolean;
  error: string | null;
  loadCards: (level: string) => Promise<void>;
}

export const useVocabularyCardStore = create<VocabularyCardState>(
  (set, get) => ({
    vocabularyCards: [],
    isLoading: false,
    error: null,
    loadCards: async (level: string) => {
      set({ isLoading: true, error: null });

      const { data, error } =
        await vocabularyCardService.fetchCardsByLevel(level);

      if (data && !error) {
        const currentCards = get().vocabularyCards;
        // Remove existing cards for this level
        const filteredCards = currentCards.filter(
          (card) => card.levelId !== level
        );
        // Add new cards
        set({ vocabularyCards: [...filteredCards, ...data], isLoading: false });
      } else {
        set({ error, isLoading: false });
      }
    }
  })
);
