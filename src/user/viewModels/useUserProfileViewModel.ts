import { useCallback, useMemo, useState } from 'react';
import { useVocabularyCardStore } from '@vocabularyCards/store/vocabularyCardsStore';
import { userSelectors } from '../store/userSelectors';

export const useUserProfileViewModel = () => {
  const { vocabularyCards } = useVocabularyCardStore();

  // Get unique levels from vocabulary cards
  const levels = useMemo(
    () =>
      vocabularyCards
        .map((card) => card.levelId)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => a.localeCompare(b)),
    [vocabularyCards]
  );

  // Active tab state
  const [activeTab, setActiveTab] = useState<string>(levels[0] ?? '');

  // Stats for the active level
  const { masteredCount, seenCount } = userSelectors.useCardStats(activeTab);
  const successRate = userSelectors.useSuccessRate(activeTab);
  const masteredWords = userSelectors.useMasteredWords(activeTab);

  // Handlers
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return {
    // State
    levels,
    activeTab,
    masteredCount,
    seenCount,
    successRate,
    masteredWords,

    // Handlers
    handleTabChange
  };
};
