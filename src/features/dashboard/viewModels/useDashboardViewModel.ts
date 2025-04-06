import { useCallback, useState } from 'react';

import {
  useVocabularyCardStore,
  vocabularyCardSelectors
} from '@/features/vocabularyCards/store/vocabularyCardsStore';
import { levelSelectors } from '@/features/levels/store/levelSelectors';
import { settingsSelectors } from '@/features/settings/store/settingsSelectors';

export const useDashboardViewModel = () => {
  // Get all levels
  const allLevels = levelSelectors.useLevels();

  // Get available levels with vocabulary cards
  const levels = vocabularyCardSelectors.useAvailableLevels(allLevels);

  // Active tab state
  const [activeTab, setActiveTab] = useState<string>(levels[0]?.id ?? '');

  // Stats for the active level
  const cardStats = useVocabularyCardStore((state) =>
    state.getCardStats(activeTab)
  );

  // Get mastered words for the active level
  const masteredWords = vocabularyCardSelectors.useMasteredWords(activeTab);

  // User language preference
  const currentLanguage = settingsSelectors.useLanguage();

  // Total stats across all levels
  const totalStats = useVocabularyCardStore((state) => state.getTotalStats());

  // Handlers
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return {
    // State
    levels,
    activeTab,
    masteredCount: cardStats.masteredCount,
    seenCount: cardStats.seenCount,
    totalWords: cardStats.totalCount,
    successRate: cardStats.successRate,
    masteredWords,
    currentLanguage,

    // Total stats
    totalMasteredCount: totalStats.masteredCount,
    totalSeenCount: totalStats.seenCount,
    totalWordsCount: totalStats.totalCount,
    overallSuccessRate: totalStats.successRate,

    // Handlers
    handleTabChange
  };
};
