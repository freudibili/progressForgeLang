import { create } from 'zustand';
import { LevelState } from '../types/levelTypes';

export const useLevelStore = create<LevelState>(() => ({
  levels: [],
  selectedLevel: null,
  isLoading: false,
  error: null
}));
