import React from 'react';
import { YStack, Text, XStack, H3 } from 'tamagui';

interface OverallProgressProps {
  totalWordsCount: number;
  totalSeenCount: number;
  totalMasteredCount: number;
  overallSuccessRate: number;
}

export const OverallProgress: React.FC<OverallProgressProps> = ({
  totalWordsCount,
  totalSeenCount,
  totalMasteredCount,
  overallSuccessRate
}) => (
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
);
