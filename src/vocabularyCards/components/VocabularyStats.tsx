import { Book, CheckCircle } from "@tamagui/lucide-icons";
import React from "react";
import { Text, XStack, YStack } from "tamagui";

type VocabularyStatsProps = {
  seenCount: number;
  masteredCount: number;
};

export const VocabularyStats = ({
  seenCount,
  masteredCount,
}: VocabularyStatsProps) => {
  return (
    <XStack gap="$4" justifyContent="center" padding="$2">
      <YStack alignItems="center" gap="$1">
        <XStack gap="$1" alignItems="center">
          <Book size={16} color="$blue10" />
          <Text color="$gray11">Seen</Text>
        </XStack>
        <Text fontSize="$6" fontWeight="bold">
          {seenCount}
        </Text>
      </YStack>
      <YStack alignItems="center" gap="$1">
        <XStack gap="$1" alignItems="center">
          <CheckCircle size={16} color="$green10" />
          <Text color="$gray11">Mastered</Text>
        </XStack>
        <Text fontSize="$6" fontWeight="bold">
          {masteredCount}
        </Text>
      </YStack>
    </XStack>
  );
};
