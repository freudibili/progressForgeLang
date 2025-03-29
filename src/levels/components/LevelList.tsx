import React from 'react';
import { YStack, H4 } from 'tamagui';

import { LevelCard } from './LevelCard';
import { Level } from '../types/levelTypes';
import { capitalizeFirstLetter } from '../../common/utils/stringUtils';

interface LevelListProps {
  levelsByCategory: Record<string, Level[]>;
  onLevelSelect: (level: Level) => void;
}

export function LevelList({ levelsByCategory, onLevelSelect }: LevelListProps) {
  return (
    <>
      {Object.entries(levelsByCategory).map(([category, categoryLevels]) => (
        <YStack key={category} gap="$2">
          <H4 fontSize="$4" fontWeight="bold">
            {capitalizeFirstLetter(category)}
          </H4>
          <YStack gap="$2" marginBottom="$4">
            {categoryLevels.map((level, index) => (
              <LevelCard
                level={level}
                onSelect={onLevelSelect}
                key={level.id}
              />
            ))}
          </YStack>
        </YStack>
      ))}
    </>
  );
}
