import { useCallback, useState } from 'react';

import { vocabularyCardSelectors } from '@/features/vocabularyCards/store/vocabularyCardSelectors';
import { levelSelectors } from '@/features/levels/store/levelSelectors';
import { settingsSelectors } from '@/features/settings/store/settingsSelectors';

export const useDashboardViewModel = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const levels = levelSelectors.useLevels();

  // Get stats for the active tab
  const cardStats = vocabularyCardSelectors.useCardStats(activeTab);
  const hasCompletedLevel =
    vocabularyCardSelectors.useIsLevelCompleted(activeTab);
  const masteryMilestone =
    vocabularyCardSelectors.useMasteryMilestone(activeTab);

  // Get total stats across all levels
  const totalStats = vocabularyCardSelectors.useTotalStats();

  // Handle tab change
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  // Get available levels with cards
  const availableLevels = vocabularyCardSelectors.useAvailableLevels(levels);

  // Get mastered words for the active level
  const masteredWords = vocabularyCardSelectors.useMasteredWords(activeTab);

  // User language preference
  const currentLanguage = settingsSelectors.useLanguage();

  return {
    activeTab,
    levels: availableLevels,
    cardStats,
    hasCompletedLevel,
    masteryMilestone,
    totalStats,
    handleTabChange,
    masteredWords,
    currentLanguage,
    // Add these for backward compatibility
    masteredCount: cardStats.masteredCount,
    seenCount: cardStats.seenCount,
    totalWords: cardStats.totalCount,
    successRate: cardStats.successRate,
    totalMasteredCount: totalStats.masteredCount,
    totalSeenCount: totalStats.seenCount,
    totalWordsCount: totalStats.totalCount,
    overallSuccessRate: totalStats.successRate
  };
};
