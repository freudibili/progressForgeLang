import { BookIcon } from '@/common/components/BookIcon';
import { TrophyIcon } from '@/common/components/TrophyIcon';

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
          <BookIcon size={24} />
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
          <TrophyIcon size={24} />
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
