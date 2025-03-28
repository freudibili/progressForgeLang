import React from 'react';
import { YStack, Text, Separator } from 'tamagui';

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
          <Text fontSize="$6" fontWeight="bold" color="$blue10">
            {capitalizeFirstLetter(category)}
          </Text>
          <YStack gap="$2">
            {categoryLevels.map((level, index) => (
              <React.Fragment key={level.id}>
                <LevelCard level={level} onSelect={onLevelSelect} />
                {index < categoryLevels.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </YStack>
        </YStack>
      ))}
    </>
  );
}
