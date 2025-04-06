import { userSelectors } from '../store/userSelectors';
import { useDashboardViewModel } from '@/features/dashboard/viewModels/useDashboardViewModel';

export const useUserProfileViewModel = () => {
  // Get user data
  const user = userSelectors.useUser();
  const statistics = userSelectors.useStatistics();

  // Get dashboard data
  const {
    levels,
    activeTab,
    masteredCount,
    seenCount,
    totalWords,
    successRate,
    masteredWords,
    currentLanguage,
    totalMasteredCount,
    totalSeenCount,
    totalWordsCount,
    overallSuccessRate,
    handleTabChange
  } = useDashboardViewModel();

  return {
    // User data
    user,
    statistics,

    // Dashboard data
    levels,
    activeTab,
    masteredCount,
    seenCount,
    totalWords,
    successRate,
    masteredWords,
    currentLanguage,
    totalMasteredCount,
    totalSeenCount,
    totalWordsCount,
    overallSuccessRate,

    // Handlers
    handleTabChange
  };
};
