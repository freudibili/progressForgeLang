import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { levelActions } from '../store/levelActions';
import { levelSelectors } from '../store/levelSelectors';
import { Level } from '../types/levelTypes';

export function useLevelSelectionViewModel() {
  const router = useRouter();
  const levelsByCategory = levelSelectors.useLevelsByCategory();
  const isLoading = levelSelectors.useIsLoading();
  const error = levelSelectors.useError();

  useEffect(() => {
    levelActions.loadLevels();
  }, []);

  const handleLevelSelect = (level: Level) => {
    levelActions.selectLevel(level);
    router.replace(`./vocabularyCards`);
  };

  return {
    levelsByCategory,
    isLoading,
    error,
    handleLevelSelect
  };
}
