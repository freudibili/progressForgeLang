import React from 'react';
import { YStack, Text, XStack, H3, Tabs } from 'tamagui';

import { Level } from '@/shared/types/sharedTypes';

interface LevelProgressProps {
  levels: Level[];
  activeTab: string;
  handleTabChange: (value: string) => void;
  totalWords: number;
  seenCount: number;
  masteredCount: number;
  successRate: number;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  levels,
  activeTab,
  handleTabChange,
  totalWords,
  seenCount,
  masteredCount,
  successRate
}) => (
  <YStack gap="$2">
    <H3>Level Progress</H3>
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
);
