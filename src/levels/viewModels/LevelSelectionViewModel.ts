import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { levelActions } from '../store/levelActions';
import { levelSelectors } from '../store/levelSelectors';
import { Level } from '../types/levelTypes';

export function useLevelSelectionViewModel() {
  const router = useRouter();
  const levels = levelSelectors.useLevels();
  const isLoading = levelSelectors.useIsLoading();
  const error = levelSelectors.useError();

  useEffect(() => {
    levelActions.loadLevels();
  }, []);

  console.log(levels);
  const handleLevelSelect = (level: Level) => {
    levelActions.selectLevel(level);
    router.replace(`./vocabularyCards`);
  };

  return {
    levels,
    isLoading,
    error,
    handleLevelSelect
  };
}
