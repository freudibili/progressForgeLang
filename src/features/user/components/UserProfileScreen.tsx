import React from 'react';
import { YStack, Text, XStack, H3, Tabs, Separator, ScrollView } from 'tamagui';

import { useUserProfileViewModel } from '../viewModels/useUserProfileViewModel';

import { MyScreen } from '@/common/components/MyScreen';
import { getTranslation } from '@/features/vocabularyCards/utils/translationUtils';
import { Language } from '@/shared/types/sharedTypes';

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
    <MyScreen title="Profile">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$4">
          {/* Overall Progress */}
          <YStack gap="$2">
            <H3>Overall Progress</H3>
            <XStack justifyContent="space-between">
              <Text fontWeight="500">Total Words:</Text>
              <Text>{totalWordsCount}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontWeight="500">Words Seen:</Text>
              <Text>{totalSeenCount}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontWeight="500">Mastered Words:</Text>
              <Text>{totalMasteredCount}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontWeight="500">Overall Success Rate:</Text>
              <Text>{(overallSuccessRate * 100).toFixed(1)}%</Text>
            </XStack>
          </YStack>

          <Separator />

          {/* Level-specific Progress */}
          <YStack gap="$2">
            <H3>Level Progress</H3>
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              width="100%"
            >
              <Tabs.List width="100%" justifyContent="space-between">
                {levels.map((level) => (
                  <Tabs.Tab key={level.id} value={level.id} flex={1}>
                    <Text numberOfLines={1}>{level.name}</Text>
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>

            <YStack gap="$2">
              <XStack justifyContent="space-between">
                <Text fontWeight="500">Total Words:</Text>
                <Text>{totalWords}</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text fontWeight="500">Words Seen:</Text>
                <Text>{seenCount}</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text fontWeight="500">Mastered Words:</Text>
                <Text>{masteredCount}</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text fontWeight="500">Success Rate:</Text>
                <Text>{(successRate * 100).toFixed(1)}%</Text>
              </XStack>
            </YStack>
          </YStack>

          <Separator />

          {/* Mastered Words List */}
          <YStack gap="$2">
            <H3>Mastered Words</H3>
            {masteredWords.map((card) => {
              const mainTranslation = getTranslation(card, Language.German);
              const userTranslation = getTranslation(card, currentLanguage);
              return (
                <XStack
                  key={card.id}
                  justifyContent="space-between"
                  padding="$2"
                >
                  <Text>{mainTranslation.infinitiv}</Text>
                  <Text color="$gray10">{userTranslation.infinitiv}</Text>
                </XStack>
              );
            })}
            {masteredWords.length === 0 && (
              <Text color="$gray10">No mastered words yet</Text>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </MyScreen>
  );
}
