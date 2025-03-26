import { LevelState, useLevelStore } from './levelStore';

export const levelSelectors = {
  useLevels: () => useLevelStore((state: LevelState) => state.levels),
  useCurrentLevel: () =>
    useLevelStore((state: LevelState) => state.currentLevel),
  useIsLoading: () => useLevelStore((state: LevelState) => state.isLoading),
  useError: () => useLevelStore((state: LevelState) => state.error)
};
