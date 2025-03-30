import { useCallback, useState } from 'react';

import { userSelectors } from '../store/userSelectors';

import { settingsSelectors } from '@/features/settings/store/settingsSelectors';

export const useUserProfileViewModel = () => {
  // Get unique levels from vocabulary cards
  const levels = userSelectors.useLevels();

  // Active tab state
  const [activeTab, setActiveTab] = useState<string>(levels[0]?.id ?? '');

  // Stats for the active level
  const { masteredCount, seenCount } = userSelectors.useCardStats(activeTab);
  const successRate = userSelectors.useSuccessRate(activeTab);
  const masteredWords = userSelectors.useMasteredWords(activeTab);

  // User language preference
  const currentLanguage = settingsSelectors.useLanguage();

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
    currentLanguage,

    // Handlers
    handleTabChange
  };
};
