import { Book, Trophy } from '@tamagui/lucide-icons';
import React from 'react';
import { Text, XStack, YStack } from 'tamagui';

type VocabularyStatsProps = {
  totalAttempted: number;
  masteredCount: number;
};

export const VocabularyStats = ({
  totalAttempted,
  masteredCount
}: VocabularyStatsProps) => {
  return (
    <XStack gap="$4" justifyContent="center" padding="$2">
      <YStack alignItems="center" gap="$1">
        <XStack gap="$1" alignItems="center">
          <Book size={16} color="$gray10" />
          <Text fontWeight="400" marginLeft="5">
            Seen
          </Text>
        </XStack>
        <Text fontSize="$6" fontWeight="bold">
          {totalAttempted}
        </Text>
      </YStack>
      <YStack alignItems="center" gap="$1">
        <XStack gap="$1" alignItems="center">
          <Trophy size={16} color="$gray10" />
          <Text fontWeight="400" marginLeft="5">
            Mastered
          </Text>
        </XStack>
        <Text fontSize="$6" fontWeight="bold">
          {masteredCount}
        </Text>
      </YStack>
    </XStack>
  );
};
