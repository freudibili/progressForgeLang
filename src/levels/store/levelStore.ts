import { create } from 'zustand';
import { Level } from '../types/levelTypes';

export interface LevelState {
  levels: Level[];
  currentLevel: Level | null;
  isLoading: boolean;
  error: string | null;
}

export const useLevelStore = create<LevelState>(() => ({
  levels: [],
  currentLevel: null,
  isLoading: false,
  error: null
}));
