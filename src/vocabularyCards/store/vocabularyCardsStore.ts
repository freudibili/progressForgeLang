import { Level } from '@levels/types/levelTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { vocabularyCardActions } from './vocabularyCardActions';
import { VocabularyCards } from '../types/vocabTypes';
import { storageUtils } from '@/utils/storage';

interface State {
  vocabularyCards: VocabularyCards;
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  vocabularyCards: [],
  isLoading: false,
  error: null
};

export const useVocabularyCardStore = create<State>()(
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
