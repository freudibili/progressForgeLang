import { MyScreen } from '@common/components/MyScreen';
import { userSelectors } from '../store/userSelectors';
import React, { useState, useMemo } from 'react';
import { YStack, Text, XStack, H3, Tabs, Separator } from 'tamagui';
import { VocabLevel } from '@levels/types/level';
import { useVocabularyCardStore } from '@vocabularyCards/store/vocabularyCardsStore';

export function UserProfileScreen() {
  const { vocabularyCards } = useVocabularyCardStore();
  const levels = useMemo(
    () =>
      vocabularyCards
        .map((card) => card.level)
        .sort((a, b) => a.localeCompare(b)),
    [vocabularyCards]
  );

  const [activeTab, setActiveTab] = useState<VocabLevel>(levels[0] ?? 'A1');
  const { masteredCount, seenCount } = userSelectors.useCardStats(activeTab);
  const successRate = userSelectors.useSuccessRate(activeTab);
  const masteredWords = userSelectors.useMasteredWords(activeTab);

  return (
    <MyScreen title="Profile">
      <YStack padding="$4" gap="$4">
        <H3>Progress Overview</H3>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as VocabLevel)}
          width="100%"
        >
          <Tabs.List width="100%" justifyContent="space-between">
            {levels.map((level) => (
              <Tabs.Tab key={level} value={level} flex={1}>
                <Text>{level}</Text>
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
      </YStack>
    </MyScreen>
  );
}
