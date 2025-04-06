import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { vocabularyCardActions } from './vocabularyCardActions';
import { VocabularyCardState } from '../types/vocabularyCardTypes';

import { Level } from '@/shared/types/sharedTypes';
import { storageUtils } from '@/shared/utils/storage';

export const useVocabularyCardStore = create<VocabularyCardState>()(
  persist(
    (set, get) => ({
      cards: {},
      progress: [],
      isLoading: false,
      error: null,

      loadCards: async (level: { id: string; url: string }) => {
        const state = get();

        // Check if cards are already loaded for this level
        if (state.cards[level.id]) {
          return;
        }

        set({ isLoading: true, error: null });
        await vocabularyCardActions.loadCards(level as Level);
      },

      markAttempt: (cardId: string, levelId: string, isCorrect: boolean) => {
        vocabularyCardActions.markAttempt(cardId, levelId, isCorrect);
      }
    }),
    {
      name: 'vocabulary-cards-storage',
      storage: storageUtils,
      partialize: (state) => ({
        cards: state.cards,
        progress: state.progress
      })
    }
  )
);
