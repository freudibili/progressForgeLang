import { MyScreen } from '@common/components/MyScreen';
import React from 'react';
import { YStack, Text, XStack, H3, Tabs, Separator } from 'tamagui';

import { useUserProfileViewModel } from '../viewModels/useUserProfileViewModel';

export function UserProfileScreen() {
  const {
    levels,
    activeTab,
    masteredCount,
    seenCount,
    successRate,
    masteredWords,
    handleTabChange
  } = useUserProfileViewModel();

  return (
    <MyScreen title="Profile">
      <H3>Progress Overview</H3>
      <Tabs value={activeTab} onValueChange={handleTabChange} width="100%">
        <Tabs.List width="100%" justifyContent="space-between">
          {levels.map((level) => (
            <Tabs.Tab key={level.id} value={level.id} flex={1}>
              <Text>{level.name}</Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <YStack gap="$2">
        <XStack justifyContent="space-between">
          <Text>Mastered Words:</Text>
          <Text>{masteredCount}</Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text>Words Seen:</Text>
          <Text>{seenCount}</Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text>Success Rate:</Text>
          <Text>{successRate.toFixed(1)}%</Text>
        </XStack>
      </YStack>

      <Separator />

      <YStack gap="$2">
        <H3>Mastered Verbs</H3>
        {masteredWords.map((card) => (
          <XStack key={card.id} justifyContent="space-between" padding="$2">
            <Text>{card.infinitiv.de}</Text>
            <Text color="$gray10">{card.infinitiv.fr}</Text>
          </XStack>
        ))}
        {masteredWords.length === 0 && (
          <Text color="$gray10">No mastered verbs yet</Text>
        )}
      </YStack>
    </MyScreen>
  );
}
