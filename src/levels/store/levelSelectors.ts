import { LevelState } from '../types/levelTypes';
import { useLevelStore } from './levelStore';

export const levelSelectors = {
  useLevels: () => useLevelStore((state: LevelState) => state.levels),
  useSelectedLevel: () =>
    useLevelStore((state: LevelState) => state.selectedLevel),
  useIsLoading: () => useLevelStore((state: LevelState) => state.isLoading),
  useError: () => useLevelStore((state: LevelState) => state.error)
};
