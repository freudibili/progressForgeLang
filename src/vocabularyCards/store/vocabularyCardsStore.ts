import { create } from 'zustand';

import { vocabularyCardService } from '../services/vocabularyCardsService';
import { VocabularyCards } from '../types/vocabTypes';
import { VocabLevel } from '@levels/types/level';

interface VocabularyCardState {
  vocabularyCards: VocabularyCards;
  isLoading: boolean;
  error: string | null;
  loadCards: (level: VocabLevel) => Promise<void>;
}

export const useVocabularyCardStore = create<VocabularyCardState>(
  (set, get) => ({
    vocabularyCards: [],
    isLoading: false,
    error: null,
    loadCards: async (level: VocabLevel) => {
      set({ isLoading: true, error: null });

      const { data, error } =
        await vocabularyCardService.fetchCardsByLevel(level);

      if (data && !error) {
        const currentCards = get().vocabularyCards;
        const levelIndex = currentCards.findIndex((vc) => vc.level === level);

        if (levelIndex >= 0) {
          // Update existing level's cards
          const updatedCards = [...currentCards];
          updatedCards[levelIndex] = { level, vocab: data };
          set({ vocabularyCards: updatedCards, isLoading: false });
        } else {
          // Add new level's cards
          set({
            vocabularyCards: [...currentCards, { level, vocab: data }],
            isLoading: false
          });
        }
      } else {
        set({ error, isLoading: false });
      }
    }
  })
);
