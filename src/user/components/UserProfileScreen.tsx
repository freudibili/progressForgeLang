import { MyScreen } from '@common/components/MyScreen';
import React from 'react';
import { YStack, Text, XStack, H3, Tabs, Separator, ScrollView } from 'tamagui';
import { getTranslation } from '@vocabularyCards/utils/translationUtils';
import { useUserProfileViewModel } from '../viewModels/useUserProfileViewModel';

export function UserProfileScreen() {
  const {
    levels,
    activeTab,
    masteredCount,
    seenCount,
    successRate,
    masteredWords,
    handleTabChange,
    currentLanguage
  } = useUserProfileViewModel();

  return (
    <MyScreen title="Profile">
      <H3>Progress Overview</H3>
      <Tabs value={activeTab} onValueChange={handleTabChange} width="100%">
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
          <Text fontWeight="500">Mastered Words:</Text>
          <Text>{masteredCount}</Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text fontWeight="500">Words Seen:</Text>
          <Text>{seenCount}</Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text fontWeight="500">Success Rate:</Text>
          <Text>{successRate.toFixed(1)}%</Text>
        </XStack>
      </YStack>

      <Separator />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$2">
          <H3>Mastered Words</H3>
          {masteredWords.map((card) => {
            const mainTranslation = getTranslation(card, 'de');
            const userTranslation = getTranslation(card, currentLanguage);
            return (
              <XStack key={card.id} justifyContent="space-between" padding="$2">
                <Text>{mainTranslation.infinitiv}</Text>
                <Text color="$gray10">{userTranslation.infinitiv}</Text>
              </XStack>
            );
          })}
          {masteredWords.length === 0 && (
            <Text color="$gray10">No mastered words yet</Text>
          )}
        </YStack>
      </ScrollView>
    </MyScreen>
  );
}
