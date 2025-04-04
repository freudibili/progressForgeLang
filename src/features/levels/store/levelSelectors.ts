import { useMemo } from 'react';
import { useLevelStore } from './levelStore';
import { GroupedLevels } from '../types/levelTypes';

export const levelSelectors = {
  useLevels: () => useLevelStore((state) => state.levels),

  useCurrentLevel: () => useLevelStore((state) => state.currentLevel),

  useIsLoading: () => useLevelStore((state) => state.isLoading),

  useError: () => useLevelStore((state) => state.error),

  useLevelsByCategory: () => {
    const levels = useLevelStore((state) => state.levels);
    return useMemo(
      () =>
        levels.reduce((acc, level) => {
          const category = level.category;
          acc[category] = acc[category] || [];
          acc[category].push(level);
          return acc;
        }, {} as GroupedLevels),
      [levels]
    );
  }
};
