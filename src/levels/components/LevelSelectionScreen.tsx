import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { YStack, Text, XStack } from 'tamagui';

import { LevelCard } from './LevelCard';
import { MyScreen } from '../../common/components/MyScreen';
import { levelActions } from '../store/levelActions';
import { levelSelectors } from '../store/levelSelectors';
import { Level } from '../types/levelTypes';

export function LevelSelectionScreen() {
  const router = useRouter();
  const levels = levelSelectors.useLevels();
  const isLoading = levelSelectors.useIsLoading();
  const error = levelSelectors.useError();

  useEffect(() => {
    levelActions.fetchLevels();
  }, []);

  const handleLevelSelect = (level: Level) => {
    levelActions.selectLevel(level);
    router.replace(`./vocabularyCards`);
  };

  return (
    <MyScreen title="Choose Your Level" error={error} loading={isLoading}>
      <YStack gap="$4">
        <Text>Select a level to start practicing your vocabulary</Text>

        <XStack flexWrap="wrap" justifyContent="space-between" gap="$4">
          {levels.map((level: Level) => (
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
