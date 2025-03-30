import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { levelActions } from './levelActions';

import { storageUtils } from '@/common/utils/storage';
import { Level } from '@/shared/types/sharedTypes';

export interface State {
  levels: Level[];
  currentLevel: Level | null;
  isLoading: boolean;
  error: string | null;
}
const initialState: State = {
  levels: [],
  currentLevel: null,
  isLoading: false,
  error: null
};

export const useLevelStore = create<State>()(
  persist(
    (set) => ({
      ...initialState,
      loadLevels: () => levelActions.loadLevels(),
      selectLevel: (level: Level) => levelActions.selectLevel(level)
    }),
    {
      name: 'level-storage',
      storage: storageUtils,
      partialize: (state) => ({ selectedLevel: state.currentLevel })
    }
  )
);
