import React from 'react';
import { YStack, Text, XStack } from 'tamagui';

import { LevelCard } from './LevelCard';
import { MyScreen } from '../../common/components/MyScreen';
import { useLevelSelectionViewModel } from '../viewModels/LevelSelectionViewModel';

export function LevelSelectionScreen() {
  const { levels, isLoading, error, handleLevelSelect } =
    useLevelSelectionViewModel();

  return (
    <MyScreen title="Choose Your Level" error={error} loading={isLoading}>
      <YStack gap="$4">
        <Text>Select a level to start practicing your vocabulary</Text>

        <XStack flexWrap="wrap" justifyContent="space-between" gap="$4">
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              onSelect={handleLevelSelect}
            />
          ))}
        </XStack>
      </YStack>
    </MyScreen>
  );
}
