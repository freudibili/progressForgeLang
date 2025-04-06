import React from 'react';
import { Button, H2, Text, YStack } from 'tamagui';

import { vocabularyCardSelectors } from '../store/vocabularyCardSelectors';

import { Level } from '@/shared/types/sharedTypes';

interface CompletionScreenProps {
  level: Level;
  onRestart: () => void;
  onNextLevel: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  level,
  onRestart,
  onNextLevel
}) => {
  const totalStats = vocabularyCardSelectors.useTotalStats();

  return (
    <YStack gap="$4" alignItems="center" justifyContent="center" flex={1}>
      <H2>Congratulations!</H2>
      <Text>You've completed {level.name}!</Text>
      <Text>Total Words Mastered: {totalStats.masteredCount}</Text>
      <Text>
        Overall Success Rate: {(totalStats.successRate * 100).toFixed(1)}%
      </Text>
      <YStack gap="$2" width="100%">
        <Button onPress={onRestart}>Restart Level</Button>
        <Button onPress={onNextLevel}>Next Level</Button>
      </YStack>
    </YStack>
  );
};
