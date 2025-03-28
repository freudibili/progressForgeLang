import { Level } from '@levels/types/levelTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { vocabularyCardActions } from './vocabularyCardActions';

import { storageUtils } from '@/common/utils/storage';
import { VocabularyCardState } from './types';

const initialState: VocabularyCardState = {
  vocabularyCards: [],
  isLoading: false,
  error: null
};

export const useVocabularyCardStore = create<VocabularyCardState>()(
  persist(
    (set) => ({
      ...initialState,
      loadCards: (level: Level) => vocabularyCardActions.loadCards(level)
    }),
    {
      name: 'vocabulary-cards-storage',
      storage: storageUtils,
      partialize: (state) => ({ vocabularyCards: state.vocabularyCards })
    }
  )
);
