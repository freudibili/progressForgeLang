import React from 'react';
import { YStack, Separator } from 'tamagui';

import { useUserProfileViewModel } from '../viewModels/useUserProfileViewModel';

import { MyScreen } from '@/shared/components/MyScreen';
import { OverallProgress } from './OverallProgress';
import { LevelProgress } from './LevelProgress';
import { MasteredWordsList } from './MasteredWordsList';

export function UserProfileScreen() {
  const {
    levels,
    activeTab,
    masteredCount,
    seenCount,
    totalWords,
    successRate,
    masteredWords,
    handleTabChange,
    currentLanguage,
    totalMasteredCount,
    totalSeenCount,
    totalWordsCount,
    overallSuccessRate
  } = useUserProfileViewModel();

  return (
    <MyScreen title="Profile" scrollable>
      <YStack gap="$4">
        <OverallProgress
          totalWordsCount={totalWordsCount}
          totalSeenCount={totalSeenCount}
          totalMasteredCount={totalMasteredCount}
          overallSuccessRate={overallSuccessRate}
        />

        <Separator />

        <LevelProgress
          levels={levels}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          totalWords={totalWords}
          seenCount={seenCount}
          masteredCount={masteredCount}
          successRate={successRate}
        />

        <Separator />

        <MasteredWordsList
          masteredWords={masteredWords}
          currentLanguage={currentLanguage}
        />
      </YStack>
    </MyScreen>
  );
}
